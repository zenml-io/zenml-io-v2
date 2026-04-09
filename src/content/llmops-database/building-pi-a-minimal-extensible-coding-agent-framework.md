---
title: "Building Pi: A Minimal, Extensible Coding Agent Framework"
slug: "building-pi-a-minimal-extensible-coding-agent-framework"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "human-in-the-loop"
  - "evals"
  - "docker"
  - "open-source"
  - "documentation"
  - "monitoring"
  - "orchestration"
  - "langchain"
  - "anthropic"
  - "openai"
  - "meta"
  - "google-gcp"
  - "amazon-aws"
  - "microsoft-azure"
industryTags: "tech"
company: "Pi"
summary: "The presenter, Mario, describes the development of Pi, a minimal and extensible coding agent framework designed to address limitations in existing tools like Claude Code, Cursor, and OpenCode. Frustrated by feature bloat, poor context management, lack of model choice, and insufficient observability in commercial coding agents, Mario built Pi as a stripped-down core that provides only four basic tools (read, write, edit, bash) with extensive customization capabilities through TypeScript extensions. Pi achieved competitive performance on the TerminalBench coding benchmark, ranking second only to Terminus while maintaining a system prompt of just a few tokens. The framework emphasizes developer control, hot-reloading extensions, and adaptability to individual workflows rather than forcing users to conform to opinionated agent designs."
link: "https://www.youtube.com/watch?v=Dli5slNaJu0"
year: 2026
seo:
  title: "Pi: Building Pi: A Minimal, Extensible Coding Agent Framework - ZenML LLMOps Database"
  description: "The presenter, Mario, describes the development of Pi, a minimal and extensible coding agent framework designed to address limitations in existing tools like Claude Code, Cursor, and OpenCode. Frustrated by feature bloat, poor context management, lack of model choice, and insufficient observability in commercial coding agents, Mario built Pi as a stripped-down core that provides only four basic tools (read, write, edit, bash) with extensive customization capabilities through TypeScript extensions. Pi achieved competitive performance on the TerminalBench coding benchmark, ranking second only to Terminus while maintaining a system prompt of just a few tokens. The framework emphasizes developer control, hot-reloading extensions, and adaptability to individual workflows rather than forcing users to conform to opinionated agent designs."
  canonical: "https://www.zenml.io/llmops-database/building-pi-a-minimal-extensible-coding-agent-framework"
  ogTitle: "Pi: Building Pi: A Minimal, Extensible Coding Agent Framework - ZenML LLMOps Database"
  ogDescription: "The presenter, Mario, describes the development of Pi, a minimal and extensible coding agent framework designed to address limitations in existing tools like Claude Code, Cursor, and OpenCode. Frustrated by feature bloat, poor context management, lack of model choice, and insufficient observability in commercial coding agents, Mario built Pi as a stripped-down core that provides only four basic tools (read, write, edit, bash) with extensive customization capabilities through TypeScript extensions. Pi achieved competitive performance on the TerminalBench coding benchmark, ranking second only to Terminus while maintaining a system prompt of just a few tokens. The framework emphasizes developer control, hot-reloading extensions, and adaptability to individual workflows rather than forcing users to conform to opinionated agent designs."
notion:
  pageId: "33df8dff-2538-80f2-a3d1-f9abfe87ad87"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-09T16:10:00.000Z"
  lastEditedTime: "2026-04-09T17:40:00.000Z"
  publishedAt: "2026-04-09T18:02:46Z"
---

## Overview

Pi is a minimalist coding agent framework developed by Mario, an engineer with extensive open source experience, as a response to what he perceived as critical limitations in existing coding agent harnesses like Claude Code, Cursor, OpenCode, Codex CLI, Amp, and Factory. The presentation chronicles the evolution of AI-assisted coding from copy-pasting from ChatGPT in 2023 through GitHub Copilot to the agentic era beginning in early 2025, when the presenter and collaborators including Armin Ronacher discovered that coding agents had reached a level of practical utility.

The core problem Mario identified was that existing coding agent platforms had become feature-bloated "spaceships" that tried to do everything, lacked transparency in their operations, provided poor context management, offered limited or no model choice, and were difficult to extend or customize. The industry was in what he called the "messing around and finding out stage" with no clear consensus on what the ideal coding agent architecture should look like. Pi was built as an experiment in minimalism and extensibility, stripping away all non-essential features while providing a robust SDK for customization.

## Technical Architecture and Design Philosophy

Pi is structured around four core packages: an AI package that abstracts multiple LLM providers with different transport protocols, an agent core implementing a generalized agent loop with tool invocations and verification, a terminal user interface of approximately 600 lines of code, and the coding agent itself which functions both as an SDK for headless operation and as a full TUI coding agent.

The framework provides only four built-in tools: read file, write file, edit file, and bash. This minimalism is intentional and informed by the TerminalBench benchmark results, where Terminus, an agent that only sends keystrokes to a tmux session and reads back VT code sequences, performed at the top of the leaderboard. This demonstrated that extensive tool sets and sophisticated features might not be necessary for strong agent performance. The system prompt for Pi is remarkably brief compared to other coding harnesses, operating on the insight that frontier models are already heavily reinforcement-learning trained to understand coding agent tasks without extensive prompting.

Pi operates in "YOLO mode" by default, meaning the agent executes actions without approval gates. Mario argues that approval-based safety measures lead to user fatigue and either get disabled entirely or become security theater where users mindlessly approve actions without reading them. Instead, he recommends containerization as the proper basis for security rather than guardrails like approval dialogs.

## Context Management and Observability

A central critique of existing tools focused on context management. Mario identified serious issues with how tools like OpenCode handle context. OpenCode implements a session compaction method that prunes all tool results before the last 40,000 tokens on each turn. This approach destroys prompt caching, a critical optimization for cost and latency when working with providers like Anthropic. Mario suggested this poor cache utilization may have contributed to tensions between Anthropic and OpenCode, with Anthropic eventually taking action against what they viewed as infrastructure abuse.

Pi addresses context management through extensibility, allowing developers to implement custom compaction strategies suited to their specific needs. The framework maintains session history as a tree structure rather than a linear chat list, enabling branching workflows and sub-agent patterns without losing observability. Developers can navigate to different branches of conversation, summarize content, and bring summaries back to the root conversation.

The emphasis on observability runs throughout Pi's design. Mario criticized Claude Code for reducing visibility in service of UI simplicity, noting that while this might work for many users, experienced developers need to see what the agent is doing. Pi provides full transparency into agent operations, complete cost tracking across sessions, HTML and JSON export of sessions, and headless JSON streaming for integration into other workflows.

## Extension System and Customization

The extensibility model is Pi's defining feature. Developers can extend the framework through TypeScript files that are automatically loaded and support hot reloading. When the agent modifies an extension file within a project, the changes take effect immediately without restarting the session. This enables a powerful pattern where the coding agent can be tasked with modifying its own capabilities.

Extensions can implement custom tools, UI components, prompt templates, themes, and skills that can be bundled and distributed via NPM or Git repositories. The framework provides full tree access to the UI system, allowing developers to build entirely custom interfaces. Examples demonstrated include a chat room for multiple Pi agents to communicate, a game to play while the agent works, web annotation tools that feed directly into agent context, and file viewing capabilities without switching to an external editor.

Developers can override built-in tools, with Mario describing a five-minute implementation of read, write, edit, and bash operations that work through SSH on remote machines. Permission gates, if desired, can be implemented in approximately 50 lines of code, allowing developers to replicate the approval workflows of other harnesses without forcing this pattern on everyone.

## Model Agnosticism and Provider Support

Unlike Claude Code, which is tightly coupled to Anthropic models, Pi is model-agnostic. The AI package abstracts multiple providers, allowing switching between models even within the same conversation session. Developers can register custom providers, proxies, or self-hosted models without framework modifications. This flexibility is crucial for developers who want to experiment with different models for different task types or take advantage of specific model capabilities.

The framework doesn't prescribe which models to use or attempt to optimize for specific model behaviors beyond the minimal system prompt. This approach assumes that frontier models will continue to improve and that over-specification of model behavior in system prompts may become counterproductive or unnecessary as models advance.

## Evaluation and Performance

Pi's performance was validated through the TerminalBench benchmark, an agent evaluation harness with approximately 82 computer use and programming tasks ranging from system configuration to Monte Carlo simulations. Using Claude Opus 4.5, Pi ranked second on the leaderboard, immediately behind Terminus, despite lacking features like model context protocol support, sub-agents, plan loading, background bash execution, or built-in to-do management.

This performance was achieved in October when Pi didn't even implement compaction, suggesting that the minimalist approach doesn't sacrifice capability. The benchmark results support Mario's thesis that the industry hasn't yet determined what features are actually necessary for effective coding agents, and that simpler architectures may perform as well or better than feature-rich alternatives.

## Anti-Features and Design Decisions

Pi deliberately excludes several features common in other coding harnesses. There is no Model Context Protocol support, though developers can implement it via CLI tools, skills, or extensions. There are no built-in sub-agents; instead, the recommended pattern is using tmux to spawn additional Pi instances with full observability into their operations. Interestingly, Claude Code's team mode later adopted a similar approach.

The framework includes no plan loading feature, with the recommendation to write plan markdown files instead, creating persistent artifacts that can be reused across sessions. There's no background bash execution, as tmux provides this functionality. There are no built-in to-do lists, with the suggestion to use to-do markdown files or build custom implementations.

Mario was particularly critical of Language Server Protocol integration, as implemented in OpenCode. The issue is that when an agent makes a series of edits to complete a task, the code typically won't compile or type-check after the first few edits. If the LSP server reports errors after each individual change and injects these errors as feedback to the model, the model receives misleading signals that its actions are wrong when it simply hasn't finished the editing sequence. This leads to poor outcomes as the model may abandon correct multi-step editing approaches. Mario argues that linting and type checking should only occur at natural synchronization points when the agent indicates it has completed a task.

## Open Source Challenges and Community Management

The presentation addressed challenges of maintaining an open source project in the era of coding agents. Mario described experiencing spam from users of other coding agents who would submit low-quality, AI-generated issues and pull requests. To combat this, he implemented "OSS vacation" periods where issues and PRs are closed for several weeks while focusing on core development, and a custom access scheme requiring human verification before accepting contributions.

The access control system maintains a markdown file in the repository listing approved contributor usernames. PRs from users not on this list are automatically closed. To get added, contributors must first introduce themselves through a human-written issue that's not excessively long, as longer content is likely to be LLM-generated. Once verified as human, contributors are added to the allowlist and can submit PRs. This approach was later adopted and generalized by Mitchell from Ghostty into a project called Vouch for broader applicability across open source repositories.

## Workflow Philosophy and Industry Positioning

The underlying philosophy of Pi is that coding agents should adapt to developer workflows rather than forcing developers to adapt to opinionated agent designs. Mario argues the industry is still experimenting with approaches ranging from minimalism to "full spaceship swarms and teams of agents" with varying levels of autonomy and control. Pi positions itself as a tool for developers who want to rapidly experiment with different agent patterns and workflows without forking and modifying entire codebases.

The emphasis on extensibility and self-modification enables what Mario calls making coding agents "malleable" so the community can quickly experiment with ideas and discover what might become industry-standard workflows. Rather than prescribing the one true way to use a coding agent, Pi provides primitives that developers can compose in task-specific or project-specific ways.

This approach contrasts with commercial tools like Claude Code that must serve a large user base and prioritize stability over experimentation, or Amp and Factory which make opinionated choices about the right way to build a coding harness. Pi explicitly targets developers with open source backgrounds and strong opinions about their tools who want maximum control and visibility into agent operations.

## Infrastructure and Implementation Details

The terminal user interface being only 600 lines of code is presented as a point of pride, contrasting with Claude Code's characterization of their TUI as a "game engine." Mario, coming from a game development background, takes issue with this characterization, arguing that the need to treat a TUI as a game engine indicates architectural problems. Specifically, he attributes Claude Code's rendering issues and flicker to using React in the terminal interface, which requires 12+ milliseconds to re-layout the entire UI graph on updates.

Pi's TUI avoids these issues through simpler architecture that can render at hundreds of frames per second without flicker. The UI supports customization through themes and can be extended with custom components while maintaining performance.

The framework includes full cost tracking across sessions, a feature Mario notes is absent or poorly implemented in many harnesses. Given that token costs and prompt caching behavior can significantly impact the economics of agent operations, especially for professional use, visibility into costs is essential for production deployments.

## Production Deployment Patterns

While the presentation focuses primarily on local development use cases, several patterns emerge that are relevant for production deployment of LLM-based coding agents. The headless JSON streaming mode enables integration of Pi as a backend component in larger systems. The ability to override built-in tools and implement remote execution through SSH suggests deployment patterns where agent operations occur in isolated or remote environments.

The emphasis on containerization as the appropriate security boundary rather than approval gates aligns with production deployment best practices. The ability to implement custom permission gates in minimal code means organizations can layer their own security and compliance requirements on top of the base framework.

The session tree structure and export capabilities provide audit trails and reproducibility, important concerns for production systems. The model-agnostic design allows organizations to switch providers or models based on performance, cost, or compliance requirements without re-architecting their agent implementations.

## Critical Assessment

The presentation is deeply opinionated and should be understood as representing one developer's perspective on the coding agent space rather than objective truth. Mario's criticisms of Claude Code, OpenCode, and other tools reflect his specific use cases and preferences. Many users are well-served by the more opinionated, feature-rich approaches these tools take.

The minimalism of Pi trades off discoverability and out-of-box functionality for flexibility. Developers must implement or find extensions for capabilities that are built into other tools. This is appropriate for the target audience of experienced developers comfortable with TypeScript, but represents a barrier for less technical users.

The TerminalBench performance, while impressive, represents a specific set of benchmarks that may not generalize to all coding tasks. The benchmark results support the minimalist thesis but don't necessarily prove that more sophisticated approaches lack value for other use cases.

The open source governance approach, while addressing real problems with LLM-generated spam, creates barriers to contribution that may limit community growth. The tension between maintaining quality and enabling broad participation is genuine, but the solution implemented may tilt too far toward restriction.

Overall, Pi represents a valuable experiment in the coding agent design space, demonstrating that high performance can be achieved with minimal built-in features and maximum extensibility. Whether this approach becomes widely adopted or remains a tool for a particular segment of developers will depend on how the broader market for coding agents evolves and whether the industry converges on standardized workflows or continues to value customization and experimentation.
