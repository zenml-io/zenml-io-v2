---
title: "Building a Self-Healing System with Context Retrieval and Multi-Agent Research Architecture"
slug: "building-a-self-healing-system-with-context-retrieval-and-multi-agent-research-architecture"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "embeddings"
  - "semantic-search"
  - "multi-agent-systems"
  - "agent-based"
  - "memory"
  - "harness-engineering"
  - "system-prompts"
  - "langchain"
  - "postgresql"
  - "elasticsearch"
  - "monitoring"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "google-gcp"
industryTags: "tech"
company: "Wix"
summary: "Wix faced the challenge of finding relevant information across thousands of services and repositories when debugging production issues, where naive agents would return the first textual match without understanding context or relevance. They built Wix Octocode Research, an enrichment service that powers their autonomous bug-fixing system (Wix Octocode Orchestrator), which uses a three-layer architecture with specialized sub-agents, parallel exploration, semantic fallback, and a memory layer for continuous learning. The system integrates code search (OctoCode), database queries (Trino), logs (Grafana), and documentation to assemble complete context for bug fixes. OctoCode itself has achieved approximately 90,000 downloads, 5,000 weekly active users, and continues to evolve with feedback loops and structural context alignment through their Context Driven Development (CDD) approach."
link: "https://www.wix.engineering/post/how-we-built-the-brain-behind-our-self-healing-system-context-retrieval-at-org-scale"
year: 2026
seo:
  title: "Wix: Building a Self-Healing System with Context Retrieval and Multi-Agent Research Architecture - ZenML LLMOps Database"
  description: "Wix faced the challenge of finding relevant information across thousands of services and repositories when debugging production issues, where naive agents would return the first textual match without understanding context or relevance. They built Wix Octocode Research, an enrichment service that powers their autonomous bug-fixing system (Wix Octocode Orchestrator), which uses a three-layer architecture with specialized sub-agents, parallel exploration, semantic fallback, and a memory layer for continuous learning. The system integrates code search (OctoCode), database queries (Trino), logs (Grafana), and documentation to assemble complete context for bug fixes. OctoCode itself has achieved approximately 90,000 downloads, 5,000 weekly active users, and continues to evolve with feedback loops and structural context alignment through their Context Driven Development (CDD) approach."
  canonical: "https://www.zenml.io/llmops-database/building-a-self-healing-system-with-context-retrieval-and-multi-agent-research-architecture"
  ogTitle: "Wix: Building a Self-Healing System with Context Retrieval and Multi-Agent Research Architecture - ZenML LLMOps Database"
  ogDescription: "Wix faced the challenge of finding relevant information across thousands of services and repositories when debugging production issues, where naive agents would return the first textual match without understanding context or relevance. They built Wix Octocode Research, an enrichment service that powers their autonomous bug-fixing system (Wix Octocode Orchestrator), which uses a three-layer architecture with specialized sub-agents, parallel exploration, semantic fallback, and a memory layer for continuous learning. The system integrates code search (OctoCode), database queries (Trino), logs (Grafana), and documentation to assemble complete context for bug fixes. OctoCode itself has achieved approximately 90,000 downloads, 5,000 weekly active users, and continues to evolve with feedback loops and structural context alignment through their Context Driven Development (CDD) approach."
notion:
  pageId: "397f8dff-2538-80e8-8e3b-e8ef7b3a433c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:57:00.000Z"
  lastEditedTime: "2026-07-08T19:57:00.000Z"
  publishedAt: "2026-07-08T20:11:51Z"
---

## Overview

Wix, a large-scale web development platform company, built a sophisticated AI-powered research and bug-fixing system to address the fundamental challenge of navigating organizational complexity at scale. With thousands of services, thousands of developers, and continuous deployment across numerous teams with their own agents and tooling, finding the root cause of production bugs became a genuinely difficult problem. The case study describes their journey building OctoCode (a GitHub search tool) and Wix Octocode Research (a comprehensive enrichment service), which together power the Wix Octocode Orchestrator autonomous bug-fixing system.

The motivation stemmed from a concrete experience: an engineer spent two days searching GitHub to find a specific link in their system. This highlighted that the existing tooling wasn't designed for cross-service, cross-context searches that constitute much of daily engineering work at scale. When debugging a production bug, the question isn't just "where is the relevant code" but rather "which of the thirty services touching this feature is responsible, what was the database state, what do the logs show, and is this even a bug or by design?"

## Core Problem and Initial Solution: OctoCode

The author initially built OctoCode as a Model Context Protocol (MCP) server on top of GitHub's tooling, primarily for personal use. The goal was to help agents navigate repositories intelligently, understand relationships between packages and services, and retrieve actual definitions rather than textual guesses. Over eleven months, OctoCode reached approximately 90,000 total downloads, 5,000 weekly active users, and 4,500 weekly downloads, indicating the problem was universal across large engineering organizations.

What differentiated OctoCode from raw GitHub search were several deliberate design decisions around how agents use tools, all emerging from observing failures rather than upfront design:

**Mandatory Reasoning for Tool Calls**: Every tool call requires the agent to articulate its research goal and why it's making the specific call before execution. This isn't bureaucratic overhead but forces the agent to think about what it's looking for rather than pattern-matching on surface keywords. The reasoning becomes part of the context window, enabling subsequent calls to benefit from accumulated understanding.

**Parallel Branch Exploration**: Instead of linear search (find one thing, decide, move on), agents can explore multiple branches simultaneously. They can check the most likely responsible service AND the adjacent service AND the documentation describing expected behavior all at once. This dramatically reduces time to complete picture.

**Semantic Fallback Hints**: When a search returns nothing useful, rather than giving up, the agent receives a hint to try searching for something semantically similar. Notably, this doesn't require a vector database—it's a prompt-level instruction telling the agent to broaden its search strategy.

**Hints on Tool Responses**: Tool returns include guidance on what to do next, preventing agents from getting stuck or looping. The search process is guided by accumulated context rather than starting fresh with each call.

## Wix Octocode Research: The Full Production System

While OctoCode solved the GitHub search problem, Wix Octocode Research addresses the wider challenge of assembling complete context across everything relevant to a bug, not just code. It uses OctoCode for static code analysis, Trino for normalized query access across all Wix databases, Grafana for live logs and runtime errors, and internal/public documentation to determine whether behavior is a bug or by design. The output is a structured research plan that downstream coding agents can act on directly.

### Three-Layer Architecture

**The Planner Layer**: Takes incoming research requests (support tickets, Jira issues, bug descriptions) and unpacks them. It identifies intent, determines the output schema (different downstream services want answers in different formats), performs an initial documentation pass, and queries memory for relevant previously-learned information. Only after this preparation does it hand off to the Researcher.

**The Researcher Layer**: A full orchestrator with access to all tooling—OctoCode, Trino, Grafana, documentation, and specialized sub-agents. This architectural choice is critical: rather than one agent with fifty tools crammed into its context window, they use specialized agents (database agent, logs agent, code agent) each with a focused toolset and their own MCP server.

The rationale for sub-agents reflects deep thinking about context window constraints and attention mechanisms. A database agent whose entire context focuses on querying and interpreting database results is far more effective than a general agent juggling everything simultaneously. Context windows are finite and attention matters. The tradeoff is complexity at the boundary—getting the schema right for how sub-agents return context to the orchestrator required significant iteration and continues to be refined.

They also experimented with **dynamic helpers**: instead of calling a fixed set of sub-agents, the orchestrator can spin up ad-hoc agents with exactly the tools needed for a specific investigation. A query needing Grafana plus code analysis plus database lookup gets one agent with those three tools rather than three round-trips through separate sub-agents. The tradeoff between flexibility and predictability remains under exploration.

**The Memory Layer**: Enables system learning. Every completed research cycle—the query, planning decisions, tools called, and final output—gets embedded and stored in a vector database. On the next similar request, the Planner retrieves those embeddings as hints, giving the Researcher a head start. Beyond storing results, the system reviews itself: after each research cycle, the orchestrator reflects on which tools worked well, which instructions were effective, and feeds that back into the process.

### Key Design Lessons Learned

**Output Generation Responsibility**: Initially, the architecture had the Researcher do work then hand off to a separate formatting agent for final output. This failed because the formatting agent had no understanding of what the Researcher actually discovered, producing generic, shallow responses without context for why anything mattered. The lesson: **the agent doing the hard investigative work should produce the output**.

**Framework Selection and Customization**: When designing the orchestration layer, they evaluated existing frameworks. LangChain felt too unstable for production—breaking changes across frequent version updates made it hard to rely on at scale. They moved to Google's ADK, which had stronger vendor backing and a cleaner model.

However, building at scale always incurs a tax. ADK's documentation and examples were Python-focused while they were deep into TypeScript. This meant forking the framework and doing significant heavy lifting. The bigger issue: out-of-the-box, the TypeScript ADK executed MCP tool calls sequentially. For a research engine built entirely around parallel execution across GitHub, Trino, and Grafana, sequential calls were a performance killer. They rewrote the core tool-calling mechanism to support true concurrency and optimized token compaction logic themselves, adding maintainability debt but gaining necessary customizability.

**Uniform Tool Protocols**: Every tool in Wix Octocode Research, regardless of what it queries, speaks the same language: before calling, state why; when returning, include hints about next steps. When agents share a protocol, attention mechanisms work in your favor. Agents don't spend context figuring out how each tool works—they already know.

## Production Challenges and Ongoing Work

The case study is refreshingly honest about unsolved problems. Finding specific records in databases from high-level bug descriptions is genuinely difficult. Isolating the right error from Grafana across dozens of services producing logs simultaneously is genuinely difficult. They acknowledge actively working on improvements and the gap between current capabilities and needs.

The organizational knowledge problem remains unsolved. Teams have context living in Slack threads and people's heads: which services are mid-migration, which behaviors are intentional despite looking broken, which architectural constraints make obvious fixes dangerous. They're building toward a model where each team maintains their own knowledge agent, and Wix Octocode Research can query those agents as part of any research cycle without forcing teams into specific formats or tooling choices.

To tackle this structural knowledge gap, they're developing **Context Driven Development (CDD)**. The idea gives every engineering unit at Wix a simple interface to explicitly declare their domain context: active repositories, primary database tables, and external dependencies. By making context declaration a first-class part of the development lifecycle, they can feed structured, up-to-date data directly into Wix Octocode Research's Planner, moving from guessing toward precise architectural alignment.

## LLMOps Principles and Measurement at Scale

The long-term success of their self-healing system fundamentally relies on constant measurement and moving from static processes to continuous feedback and learning loops. Several principles are architecturally embedded:

**Closed-Loop Learning**: The system operates as a closed control loop. The Memory Layer stores embeddings of every completed research cycle in a vector database, including planning decisions and tool outcomes. This gives the Planner a head start on similar requests by retrieving past resolutions as hints. The orchestrator reflects on tool effectiveness and feeds learning back, ensuring continuous improvement and policy synthesis to reduce recurrence of similar defect classes.

**Constant Measurement and Accountability**: Enforced through uniform tool protocols across all agents. Every tool call must state its reason and every return must include next-step hints. This protocol ensures the agent is reasoning rather than pattern-matching, turning internal behavior into a measurable, traceable process.

**Structural Context Alignment**: Overcoming organizational knowledge problems requires structural solutions. CDD mandates that every engineering unit explicitly declares their domain context. Making this context declaration first-class in the development lifecycle feeds up-to-date data directly into the Planner, moving toward precise architectural alignment rather than guesswork.

## Critical Assessment and Balanced View

While the case study presents an impressive technical achievement, several aspects warrant balanced consideration:

**Claims vs. Evidence**: The post mentions OctoCode has 90,000 downloads and 5,000 weekly active users but doesn't provide metrics on the Wix Octocode Orchestrator's actual bug-fixing success rates, false positive rates, or time savings compared to manual debugging. The "self-healing" terminology is aspirational—the system is more accurately described as an AI-assisted debugging and research tool rather than fully autonomous self-healing.

**Complexity and Maintenance Burden**: Forking Google's ADK and rewriting core tool-calling mechanisms creates significant technical debt. While they gained necessary customizability, the long-term maintainability costs when ADK evolves and their fork diverges aren't discussed. The complexity of managing multiple specialized sub-agents, dynamic helper spawning, and uniform protocols across heterogeneous tools represents substantial ongoing engineering investment.

**Unsolved Challenges**: The authors are commendably honest about ongoing difficulties—finding specific database records from high-level descriptions and isolating relevant logs remain genuinely hard problems. The organizational knowledge problem and dependency on teams maintaining their own knowledge agents introduces human process dependencies that may be difficult to enforce consistently.

**Vendor Lock-in and Tool Dependencies**: Heavy reliance on Google's ADK, GitHub, Grafana, and Trino creates multiple points of vendor dependency. While these are reasonable choices for their environment, organizations without similar stacks would face significant adaptation challenges.

**Scalability Questions**: While built for Wix's scale (thousands of services and developers), the case study doesn't discuss cost implications of running multiple AI agents in parallel, embedding and storing every research cycle, and maintaining vector databases at scale. Token consumption and API costs for orchestration at this level could be substantial.

Despite these considerations, the technical approach demonstrates sophisticated thinking about multi-agent systems in production, particularly around context management, parallel execution, and continuous learning. The emphasis on forcing agents to articulate reasoning before tool calls and providing hints on responses represents thoughtful prompt engineering that addresses common failure modes. The recognition that specialized agents with focused toolsets outperform generalist agents with bloated context windows reflects practical wisdom about LLM attention mechanisms.

The commitment to measurement, reflection, and closed-loop learning distinguishes this from many agentic AI implementations that lack systematic evaluation. The Memory Layer's approach to embedding research cycles and feeding past learnings forward represents genuine LLMOps practice rather than one-off experimentation.

Overall, this case study illustrates a mature approach to deploying multi-agent LLM systems in production environments with realistic acknowledgment of ongoing challenges and the iterative nature of building reliable AI tooling at organizational scale.
