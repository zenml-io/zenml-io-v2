---
title: "Agentic Engineering: Building Production Systems with Coding Agents"
slug: "agentic-engineering-building-production-systems-with-coding-agents"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "mcp"
  - "docker"
  - "cicd"
  - "devops"
  - "open-source"
  - "security"
  - "guardrails"
  - "langchain"
  - "anthropic"
  - "google-gcp"
  - "meta"
industryTags: "tech"
company: "Oschlo"
summary: "This case study explores the evolution of software development using AI coding agents over an 18-month period, from late 2024 through 2025 and into 2026. The speaker, a developer at Oschlo, transitioned from traditional software engineering to building production systems primarily using coding agents like Claude Code, Aider, Codex, and Pi. The solution involved developing systematic workflows incorporating skills, deterministic tools, multi-agent orchestration, automated verification, and autonomous systems like a \"sentinel\" that monitors CI/CD pipelines and automatically creates pull requests. Results demonstrate that complex features can be built in hours instead of weeks, with one example showing an end-to-end feature built using 2 million tokens over 1 hour 45 minutes with minimal human intervention, though at significant token costs that are becoming a limiting factor for enterprise adoption."
link: "https://www.youtube.com/watch?v=Tj6Df_K-IRc"
year: 2026
seo:
  title: "Oschlo: Agentic Engineering: Building Production Systems with Coding Agents - ZenML LLMOps Database"
  description: "This case study explores the evolution of software development using AI coding agents over an 18-month period, from late 2024 through 2025 and into 2026. The speaker, a developer at Oschlo, transitioned from traditional software engineering to building production systems primarily using coding agents like Claude Code, Aider, Codex, and Pi. The solution involved developing systematic workflows incorporating skills, deterministic tools, multi-agent orchestration, automated verification, and autonomous systems like a \"sentinel\" that monitors CI/CD pipelines and automatically creates pull requests. Results demonstrate that complex features can be built in hours instead of weeks, with one example showing an end-to-end feature built using 2 million tokens over 1 hour 45 minutes with minimal human intervention, though at significant token costs that are becoming a limiting factor for enterprise adoption."
  canonical: "https://www.zenml.io/llmops-database/agentic-engineering-building-production-systems-with-coding-agents"
  ogTitle: "Oschlo: Agentic Engineering: Building Production Systems with Coding Agents - ZenML LLMOps Database"
  ogDescription: "This case study explores the evolution of software development using AI coding agents over an 18-month period, from late 2024 through 2025 and into 2026. The speaker, a developer at Oschlo, transitioned from traditional software engineering to building production systems primarily using coding agents like Claude Code, Aider, Codex, and Pi. The solution involved developing systematic workflows incorporating skills, deterministic tools, multi-agent orchestration, automated verification, and autonomous systems like a \"sentinel\" that monitors CI/CD pipelines and automatically creates pull requests. Results demonstrate that complex features can be built in hours instead of weeks, with one example showing an end-to-end feature built using 2 million tokens over 1 hour 45 minutes with minimal human intervention, though at significant token costs that are becoming a limiting factor for enterprise adoption."
notion:
  pageId: "3b8f8dff-2538-8020-856e-db4bfb0cc71c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T12:49:00.000Z"
  lastEditedTime: "2026-08-10T12:49:00.000Z"
  publishedAt: "2026-08-10T15:27:37Z"
---

## Overview

This case study presents a comprehensive look at production software development using AI coding agents, based on 18 months of experience at Oschlo, a small consultancy of four senior technologists helping companies build AI products. The journey began in late 2024 and continued through 2025 into 2026, documenting the evolution from initial experimentation with tools like Cursor and Aider to sophisticated multi-agent workflows using Claude Code, Codex, Pi, and local models.

The case provides particularly valuable insights into the operational challenges and solutions for using LLMs in production software development contexts, moving beyond simple "vibe coding" to engineered systems with proper verification, security, and automation. The speaker emphasizes the distinction between throwaway prototypes and production-ready code, arguing for what they term "agentic engineering" as a more appropriate framing than "vibe coding."

## Evolution of Tools and Workflow

The speaker's journey began with Cursor in late 2024, which felt like "autocomplete plus" but didn't provide transformative value. The breakthrough came with Aider, described as the "grandfather of coding agents CLI tools," which featured an architect mode and terminal-based workflow. However, the real paradigm shift occurred in February 2025 when Claude Code was released, which the speaker downloaded on the first day and has used as their primary tool for the past year and a half. The preference for terminal-based tools reflects a workflow optimization for developers comfortable with CLI environments.

The tools have evolved significantly in capability, with improvements in both the underlying models and the harnesses that wrap them. A critical insight is that the harness and model should be evaluated together, as there remains substantial room for improvement in how tools leverage existing model capabilities, not just waiting for the next frontier model release.

## Key Operational Shifts

The case study identifies six major shifts in how coding agents are used in production:

**From Perfect Prompts to Collaborative Planning**: Early emphasis on prompt engineering and crafting perfect prompts outside the agent has given way to iterative plan-building with the agent itself. The introduction of plan mode in Claude Code was transformative, with the speaker spending most of their time in this mode. They now use the Superpowers plugin extensively, which provides a structured workflow with brainstorming, human-in-the-loop checkpoints, and live previews. This collaborative approach treats the agent more like a team member with whom you build context together, rather than a tool you feed pre-crafted instructions.

**Deterministic Tools Over Inference**: A crucial operational principle is minimizing unnecessary token usage by solving deterministic problems deterministically. The speaker demonstrated this with a JSON processing example: using the JQ CLI tool to extract emails from 150 user records was substantially faster and more token-efficient than having the LLM process the data. More critically, when calculating total spend across users, JQ produced the correct result consistently, while the LLM approach sometimes produced incorrect calculations and varied its approach unpredictably between runs. This demonstrates that inference is non-deterministic and expensive, so deterministic CLI tools should always be preferred when available. The Unix philosophy of simple, single-purpose tools aligns well with this approach.

**Skills as Core Workflow Building Blocks**: Skills have become the "bread and butter" of the workflow, replacing earlier approaches of building custom sub-agents. Skills are reusable, composable units of behavior that solve recurring problems. Claude Code includes a skill builder with evaluation capabilities, making it easy to create skills whenever a problem recurs. A demonstration showed how a pricing policy skill and a systematic debugging skill combined to solve a test failure by applying banker's rounding rules and minimum charge policies, whereas an unskilled agent simply fixed the rounding error without understanding business constraints.

One particularly valuable skill is a research skill that pulls content from GitHub repos, blog posts, and YouTube videos using the YT-DLP CLI tool, then creates structured verdict files with key facts, relevance assessment, application suggestions, and connections to existing knowledge. This builds a personal knowledge base similar to the Obsidian memory/brain method, and can also be used to evaluate whether long-form content is worth consuming before investing time in it.

**HTML Over Markdown for Output**: While markdown is developer-friendly, HTML provides substantially better readability for reviewing agent output, especially for complex documents with flowcharts and extensive text. The Anthropic playground plugin enables live previews with interactive controls and a feedback mechanism where users can annotate elements and copy the full context with annotations back into the agent session. This same pattern can be applied to user-facing applications to collect contextual feedback that feeds directly into agent workflows.

**Multi-Agent Orchestration**: The workflow has evolved from single-agent sessions to running multiple agents in parallel across different parts of projects or entirely different projects. Tools like tmux, Git worktrees, and Conductor enable this, though much functionality is being integrated directly into agent tools. Using tmux sessions with separate panes and windows for each project allows context isolation and prevents merge conflicts through structured handover artifacts like markdown files, HTML files, or issue tracker entries. This dramatically increases development bandwidth by enabling full-load work on one project while switching to kick off work on another.

**Autonomous Verification and Evaluation**: Quality assurance is critical for production systems and cannot be skipped in "vibe" projects. Verification should be automated and as deterministic as possible. The speaker uses tests, type checks, and validations in the traditional way rather than spending inference tokens on verification. However, they do use model-to-model verification in planning stages, taking brainstorming documents from Claude and asking Codex for review and input, iterating between models to get more nuanced feedback than using a single model in a fresh context would provide.

Security receives particular attention as the area where the speaker invests the most human-in-the-loop review time, emphasizing that data leakage destroys user confidence in ways that bugs do not. The OWASP secure agent playbook provides a set of skills that check code against the OWASP top 10 security vulnerabilities and consistently finds issues worth fixing. A critical principle is to watch what the model did, not just what it said in the chat, as these may differ.

## Production Autonomous System: The Sentinel

The most sophisticated production system described is a "sentinel" running on a development server with local models. This autonomous system monitors multiple signal sources every five minutes:

- Log files from applications
- CI/CD pipeline results  
- Issue tracker tags indicating agent-appropriate work

When it detects work, the sentinel spins up a pre-warmed Inky container (lightweight containers that start in seconds), performs triage to determine problem complexity, and routes simple problems to local models while sending complex issues to Claude Code via API. It then creates a pull request, shuts down the container, and on subsequent runs checks for review feedback. Pull requests are automatically assigned to Codex for review, creating a multi-model review process.

The system integrates with Slack, allowing team members to direct work via messages like "I made a new issue, can you please look at it?" or "I have looked at PR 26, you can merge it now." This autonomous loop handles approximately 70% of issues with local models and 30% with cloud models. Since it runs completely unattended on servers, the slower inference speed of local models is not a concern. Container sandboxing prevents potential damage from agent actions.

This represents a practical implementation of fully autonomous LLM operations, where the system runs continuously without human intervention except for final PR approval, demonstrating a pathway to agents writing code primarily for other agents to maintain.

## Advanced Workflows and Goal-Based Execution

Recent developments in tools like Claude Code enable substantially more autonomous work through dynamic workflows and goal-based execution. One example involved building a full-feature database with APIs and complete front-end using the Superpowers plugin workflow:

- Design phase: 11 self-generated sub-agents, approximately 1 million tokens, 21 minutes runtime
- Planning phase: approximately 700,000 tokens
- Build phase: approximately 2 million tokens, 1 hour 45 minutes runtime

This produced an end-to-end feature with only two human interventions: approving transition from design to plan, and plan to build. All tests and verifications passed, with only one minor front-end text display bug discovered during manual testing. This demonstrates the current capability to build complex features in under two hours that would previously have required 2-3 weeks.

The goal keyword functionality, available in both Claude Code and Codex, enables agents to work autonomously toward specified goals, similar to but more refined than earlier Ralph Wiggum loops. A demonstration showed fixing test failures by specifying a goal to make tests pass and implement a CSV parsing contract, which completed in one turn using 1.7K tokens for a simple case, though more complex goals can require substantially more iterations and tokens.

## Cost Considerations and Local Model Strategy

Token costs are emerging as a significant limiting factor for production use. The Norwegian welfare agency reported costs increased 3-4x overnight after GitHub Copilot changed pricing models. Uber has capped usage at $1,500 per person per month, indicating enterprise organizations are hitting budget constraints. One colleague exhausted their entire weekly Claude subscription in a couple of days running intensive workflows.

The release of Claude 3.5 Sonnet (referred to as Fable in the talk) introduced a shift to API-only access after a two-week trial period, further emphasizing cost as a gating factor. This necessitates more strategic model selection rather than defaulting to the most capable model for all tasks.

Local model deployment provides a cost mitigation strategy. Demonstrations showed Gemma 4 27B running on a Strix Halo machine with 128GB RAM (96GB allocated as VRAM) solving coding tasks nearly as quickly as Claude Sonnet for simple problems. A smaller Gemma 4 variant released in recent weeks can run on typical developer laptops with 32-64GB RAM. For the autonomous sentinel system, using local models for 70% of tasks provides substantial cost savings, with inference speed irrelevant since work happens unattended on servers.

## Team Structure and Role Evolution

The speaker predicts software development teams will become smaller with more fluid roles. The distinction between product management and development blurs as developers must think more about direction, goals, and user value rather than just implementation. Code generation has become easy but not free, while human thinking, problem understanding, outcome assessment, and accountability remain essential. The role evolves toward conductor or orchestrator rather than code author.

Importantly, the speaker emphasizes that software engineers are not going away, and most code will still be built by software developers using AI agents, just with different responsibilities. The human remains accountable for agent actions—you cannot say "the agent did that, it's not my problem" because you directed the agent.

## Tooling Ecosystem and Recommendations

Key tools and resources mentioned include:

- **Coding agents**: Claude Code (primary), Codex, Pi (lightweight, YOLO mode by default requiring guardrails), Aider
- **Plugins**: Superpowers (workflow with brainstorming, planning, building), Anthropic playground (for live previews and feedback)
- **CLI tools**: JQ (JSON processing), GitHub CLI (preferred over GitHub MCP), YT-DLP (YouTube content extraction), Coolify (local Vercel-like deployment), agent browser CLI and Playwright CLI (front-end verification)
- **Infrastructure**: tmux (session management), Git worktrees (context isolation), Inky containers (lightweight agent sandboxing)
- **Resources**: skills.sh (800,000+ skills for inspiration, though the speaker recommends building custom versions rather than downloading directly), OWASP secure agent playbook
- **Models**: Claude Opus/Sonnet for complex work, Gemma 4 27B for local deployment

The speaker recommends not getting too attached to any single tool ecosystem, drawing parallels to the JavaScript framework churn of 10-12 years ago where the best option changed constantly. Flexibility and willingness to experiment with different models and harnesses is important as the field remains in rapid flux.

## MCP vs CLI Tools

While Model Context Protocols were initially viewed as the universal solution when first released, their usage has declined substantially. Tools have improved at not loading entire MCPs into context, making them cheaper to use, but they remain more complex and token-intensive than CLI tools in almost all cases. The GitHub CLI versus GitHub MCP comparison illustrates this clearly, with the CLI being more efficient. 

The speaker sees MCPs having a more prominent role in office work applications like using them in Google Workspace or Gemini Enterprise, but for development work, CLI tools are the first choice. This reflects a broader principle of preferring simple, focused, deterministic tools over complex inference-heavy approaches.

## Memory and Context Management

Proper memory management distinguishes personal workflows from team workflows. Individual developer memory (like Claude's memory feature) stores personal preferences and work patterns, while team-level context requires shared solutions. Some teams have built custom shared team memory systems. The speaker emphasizes the value of being able to maintain personal working styles while integrating into team processes, providing more flexibility than traditional development where everyone must work identically.

Documentation placement depends on organizational context. For small teams, plan files and documentation live in Git repos, often broken into GitHub issues for incremental work. Larger organizations might use MCPs to integrate with documentation platforms for better long-term knowledge persistence. The speaker typically deletes plan files after completion, extracting valuable long-term documentation first since plans become invalid once implemented.

## Critical Assessment

While the case study demonstrates impressive capabilities, several caveats merit attention:

**Cost viability**: The token consumption for advanced workflows (2 million tokens for a single feature) raises questions about economic sustainability at scale, particularly as providers shift pricing models. The $1,500 monthly cap at Uber and subscription exhaustion in days suggests these approaches may only be viable for high-value work or organizations with substantial budgets.

**Quality claims**: The assertion that end-to-end features work with only one minor bug should be viewed with appropriate skepticism. The speaker's emphasis on security review suggests more problems may emerge in areas receiving less scrutiny. The 70% success rate for the autonomous sentinel system is not explicitly stated, only the 70/30 split between local and cloud models.

**Skill transferability**: The workflows described require sophisticated understanding of software architecture, Unix tools, container orchestration, and LLM capabilities. The barrier to entry may be higher than implied, limiting adoption to senior developers with broad technical backgrounds like the four-person Oschlo team.

**Model dependency**: Heavy reliance on specific tools like Claude Code creates switching costs and vendor lock-in risks, though the speaker's advice to remain flexible across tools attempts to mitigate this.

**Verification gaps**: While automated testing is emphasized, the human-in-the-loop security review suggests current verification approaches have significant gaps. The principle of "watch what the model did, not what it said" indicates trust but verify remains essential.

Despite these caveats, the case study provides valuable practical insights into production LLM operations, demonstrating that with appropriate engineering discipline, systematic workflows, and cost awareness, coding agents can materially increase development productivity while maintaining acceptable quality standards. The evolution from simple autocomplete to autonomous multi-agent systems over 18 months illustrates the rapid maturation of LLMOps practices in software development contexts.
