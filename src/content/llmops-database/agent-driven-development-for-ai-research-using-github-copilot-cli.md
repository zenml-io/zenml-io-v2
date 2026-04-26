---
title: "Agent-Driven Development for AI Research Using GitHub Copilot CLI"
slug: "agent-driven-development-for-ai-research-using-github-copilot-cli"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "cicd"
  - "documentation"
  - "open-source"
  - "devops"
  - "continuous-integration"
  - "continuous-deployment"
  - "anthropic"
  - "microsoft-azure"
industryTags: "tech"
company: "GitHub"
summary: "Tyler McGoffin, a senior applied researcher on GitHub's Copilot Applied Science team, faced the challenge of analyzing hundreds of thousands of lines of code in agent trajectory files from evaluation benchmarks like TerminalBench2 and SWEBench-Pro. He developed 'eval-agents', a tool built primarily using GitHub Copilot CLI with Claude Opus 4.6, to automate this intellectual analysis work. By adopting an \"agent-first development\" approach with improved prompting strategies, architectural practices prioritizing documentation and testing, and CI/CD guardrails, his team of five researchers was able to collaboratively build 11 new agents, four new skills, and introduce eval-agent workflows in under three days, resulting in over 28,000 lines of code changes across 345 files."
link: "https://github.blog/ai-and-ml/github-copilot/agent-driven-development-in-copilot-applied-science/"
year: 2026
seo:
  title: "GitHub: Agent-Driven Development for AI Research Using GitHub Copilot CLI - ZenML LLMOps Database"
  description: "Tyler McGoffin, a senior applied researcher on GitHub's Copilot Applied Science team, faced the challenge of analyzing hundreds of thousands of lines of code in agent trajectory files from evaluation benchmarks like TerminalBench2 and SWEBench-Pro. He developed 'eval-agents', a tool built primarily using GitHub Copilot CLI with Claude Opus 4.6, to automate this intellectual analysis work. By adopting an \"agent-first development\" approach with improved prompting strategies, architectural practices prioritizing documentation and testing, and CI/CD guardrails, his team of five researchers was able to collaboratively build 11 new agents, four new skills, and introduce eval-agent workflows in under three days, resulting in over 28,000 lines of code changes across 345 files."
  canonical: "https://www.zenml.io/llmops-database/agent-driven-development-for-ai-research-using-github-copilot-cli"
  ogTitle: "GitHub: Agent-Driven Development for AI Research Using GitHub Copilot CLI - ZenML LLMOps Database"
  ogDescription: "Tyler McGoffin, a senior applied researcher on GitHub's Copilot Applied Science team, faced the challenge of analyzing hundreds of thousands of lines of code in agent trajectory files from evaluation benchmarks like TerminalBench2 and SWEBench-Pro. He developed 'eval-agents', a tool built primarily using GitHub Copilot CLI with Claude Opus 4.6, to automate this intellectual analysis work. By adopting an \"agent-first development\" approach with improved prompting strategies, architectural practices prioritizing documentation and testing, and CI/CD guardrails, his team of five researchers was able to collaboratively build 11 new agents, four new skills, and introduce eval-agent workflows in under three days, resulting in over 28,000 lines of code changes across 345 files."
notion:
  pageId: "34ef8dff-2538-818e-a58c-fa6d30471f02"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T10:04:58Z"
---

## Overview and Context

Tyler McGoffin, a Senior Applied Researcher on GitHub's Copilot Applied Science team, presents a comprehensive case study on what he terms "agent-driven development" - using AI coding agents not just as tools but as primary contributors to a software project. The specific use case emerged from his daily work analyzing coding agent performance against standardized evaluation benchmarks such as TerminalBench2 and SWEBench-Pro. This analysis required examining agent trajectories (essentially logs of the thought processes and actions agents take while performing tasks), which are typically JSON files with hundreds of lines of code per task. Across dozens of tasks in multiple benchmark runs, this amounted to hundreds of thousands of lines of code requiring analysis on any given day.

McGoffin's initial workflow involved using GitHub Copilot to identify patterns in these trajectories, which would reduce the manual review burden from hundreds of thousands of lines to a few hundred. However, recognizing this as repetitive intellectual toil, he set out to automate even this reduced analysis work by building a tool called 'eval-agents'. What makes this case study particularly interesting from an LLMOps perspective is not just that he built an AI tool, but that he used AI coding agents as the primary development mechanism and then designed the entire project architecture to enable other team members to contribute primarily through agent-driven workflows.

## Technical Stack and Infrastructure

The technical foundation of this work centers on several key components. McGoffin's coding agent setup consisted of GitHub Copilot CLI as the primary coding agent interface, Claude Opus 4.6 as the underlying model, and VSCode as the integrated development environment. Critically, he leveraged the Copilot SDK to accelerate agent creation, which provided out-of-the-box access to existing tools and Model Context Protocol (MCP) servers, mechanisms for registering new tools and skills, and various agentic capabilities that didn't need to be built from scratch.

The Copilot SDK integration is particularly noteworthy from an LLMOps perspective because it demonstrates the value of platform-level abstractions that reduce the engineering overhead of building agentic systems. Rather than implementing low-level agent orchestration, tool calling, and state management, McGoffin could focus on the domain-specific logic of his evaluation analysis agents.

## Prompting Strategies for Production Agent Development

One of the most valuable LLMOps insights from this case study relates to effective prompting strategies for using coding agents in production development workflows. McGoffin advocates treating AI coding agents like human engineers - guiding their thinking, over-explaining assumptions, and leveraging their research speed for planning before implementation. He found conversational, verbose prompting far more effective than terse problem statements.

A concrete example he provides involves creating regression tests. Rather than issuing a directive, he engaged in a planning-mode conversation: "/plan I've recently observed Copilot happily updating tests to fit its new paradigms even though those tests shouldn't be updated. How can I create a reserved test space that Copilot can't touch or must reserve to protect against regressions?" This conversational approach led to a back-and-forth that ultimately produced guardrails akin to contract testing that could only be updated by humans.

This prompting philosophy reflects a broader understanding that the agents work best on well-scoped problems but need guidance for complex challenges. The explicit use of planning modes before agent modes represents a two-phase approach: first, collaboratively design the solution through conversation; then, let the agent implement it autonomously. This mirrors effective human engineering workflows and appears to be a critical practice for production LLM deployment in development contexts.

## Architectural Strategies: Optimizing for Agent Consumption

Perhaps the most counterintuitive insight from this case study is that optimizing a codebase for AI agent consumption fundamentally changes development priorities in ways that happen to align with software engineering best practices that teams often deprioritize. McGoffin discovered that refactoring for readability, writing comprehensive tests, maintaining thorough documentation, and cleaning up dead code - tasks traditionally deprioritized in favor of feature development - become the most important work when building an agent-first repository.

The reasoning is straightforward but profound: when agents can easily navigate and understand a well-maintained codebase, delivering new features becomes trivial. McGoffin reports spending most of his time on this project refactoring names and file structures, documenting new features and patterns, adding test cases, and cleaning up dead code that agents missed. This work enables both human engineers and AI agents to understand the codebase patterns more easily.

From an LLMOps perspective, this represents a critical lesson about the operational requirements of maintaining AI-assisted development workflows. The investment in code quality and documentation pays dividends not just for human maintainability but for agent effectiveness. This creates a virtuous cycle: better documentation and structure enable agents to contribute more effectively, which makes it cheaper to maintain that documentation and structure, which further improves agent effectiveness.

McGoffin even notes that with this infrastructure in place, he can ask questions like "Knowing what I know now, how would I design this differently?" and actually justify going back to rearchitect the entire project with Copilot's assistance - something that would typically be prohibitively expensive.

## Iteration Strategies: From "Trust but Verify" to Blameless Culture

The case study introduces an important philosophical shift in how to work with AI agents in production contexts. McGoffin moved from a "trust but verify" mindset to what he calls "blame process, not agents," mirroring how effective human teams operate with blameless culture. The core principle is implementing processes and guardrails to prevent mistakes, and when mistakes do occur, learning from them to introduce new processes and guardrails.

Concretely, this means implementing robust CI/CD practices that serve as automated quality gates. Strict typing ensures agents conform to interfaces. Robust linters impose implementation rules that keep agents following good patterns. Integration, end-to-end, and contract tests - which can be expensive to build manually but are cheaper with agent assistance - provide confidence that new changes don't break existing features. When Copilot has these tools available in its development loop, it can check its own work.

This approach represents a mature understanding of LLMOps: rather than treating the AI agent as an unreliable tool that requires constant human verification, the system is architected so that automated processes catch errors regardless of whether they originate from human or AI contributors. This is critical for making agent-driven development scale beyond individual contributors to team workflows.

## The Development Loop in Practice

McGoffin outlines a concrete development workflow that his team follows:

First, plan a new feature with Copilot using the `/plan` command, iterating on the plan and ensuring that testing and documentation updates are included before code implementation. The documentation serves as additional guidelines alongside the plan. Second, let Copilot implement the feature using `/autopilot`. Third, initiate a review loop with the Copilot Code Review agent, continuing until there are no more relevant comments. Fourth, conduct human review where the architectural and prompting patterns are enforced.

Beyond individual feature development, McGoffin recommends regular maintenance prompts run early and often:
- Reviewing code for missing tests, broken tests, and dead code
- Reviewing code for duplication or opportunities for abstraction
- Reviewing documentation and code to identify gaps, updating the copilot-instructions.md file to reflect changes

He runs these automatically once a week but often executes them throughout the week as new features and fixes are integrated. This represents a form of automated technical debt management that would be prohibitively expensive with purely human labor but becomes tractable with agent assistance.

## Measurable Results and Team Collaboration

The quantitative results of this approach are striking. Five team members, jumping into the project for the first time, created 11 new agents, four new skills, and introduced the concept of eval-agent workflows in less than three days. This resulted in +28,858/-2,884 lines of code changes across 345 files. While McGoffin presents this as a remarkable achievement, it's worth noting that these are self-reported metrics from a GitHub blog post promoting their own product, so some skepticism is warranted about whether this pace is sustainable or representative of typical development work.

Nevertheless, the case study provides valuable evidence that when a codebase is properly structured for agent consumption - with clear documentation, robust tests, and well-defined patterns - multiple developers can quickly onboard and contribute through agent-assisted workflows. This suggests that the upfront investment in "agent-friendly" infrastructure pays dividends for team scalability.

## Critical Assessment and Limitations

While this case study provides valuable insights into agent-driven development practices, several caveats deserve consideration. First, this is a first-party case study from GitHub promoting their own Copilot product, written by a researcher on the Copilot Applied Science team. The incentives to highlight successes and downplay challenges are clear. McGoffin is also working in a highly specific context - building tools for AI research evaluation - which may not generalize to all software development contexts.

Second, the case study lacks detail about failure modes, debugging challenges, or situations where the agent-driven approach didn't work well. For instance, what happens when agents introduce subtle bugs that pass all automated checks? How much time is spent on human review catching issues the agents missed? What types of tasks or changes are still better suited to traditional development?

Third, the economic analysis is incomplete. While McGoffin claims that maintaining documentation and tests becomes "cheaper" with agent assistance, there's no quantitative comparison of time spent or cost incurred. The claim that "delivering features with Copilot becomes trivial when you have a well-maintained, agent-first project" is a strong assertion that would benefit from more rigorous support.

Fourth, the case study doesn't address important LLMOps concerns like model versioning, prompt drift, or reproducibility. What happens when the underlying Claude Opus model is updated? Do prompts that worked previously continue to work? How are successful prompts versioned and shared across the team?

## Broader LLMOps Implications

Despite these limitations, the case study offers several valuable lessons for LLMOps practitioners. The emphasis on treating codebase quality, documentation, and testing as first-order concerns for enabling AI agents reflects an important operational insight: the effectiveness of LLMs in production is often limited not by model capabilities but by the quality of the context they can access. This aligns with broader findings in retrieval-augmented generation and prompt engineering that context quality matters enormously.

The "blame process, not agents" philosophy represents a mature approach to building reliable systems with AI components. Rather than treating AI unreliability as an inherent limitation that requires constant human oversight, the approach architects guardrails and processes that catch errors regardless of source. This enables AI to be integrated into development workflows as a first-class contributor rather than a supervised assistant.

The two-phase planning-then-implementation workflow, heavy use of planning modes, and conversational prompting style all represent practical prompting strategies that appear transferable to other LLM application contexts. The insight that verbose, conversational prompts with explicit context outperform terse directives is well-supported in the broader prompt engineering literature.

Finally, the case study demonstrates the value of platform-level abstractions like the Copilot SDK and MCP servers for reducing the engineering overhead of building agentic applications. Rather than each team reinventing agent orchestration, tool calling, and state management, these platforms provide standardized primitives that enable developers to focus on domain-specific logic. This has important implications for the maturation of LLMOps tooling and practices.

## Conclusion

This case study documents an experiment in using AI coding agents not just as development assistants but as primary contributors to a software project, with the codebase and workflows optimized specifically for agent effectiveness. While the results should be interpreted cautiously given the promotional context and limited discussion of challenges, the case study offers valuable insights into prompting strategies, architectural practices, and iteration workflows that may benefit teams deploying LLMs in production development contexts. The emphasis on code quality, documentation, testing, and automated guardrails as enablers of agent effectiveness represents an important operational insight for LLMOps practitioners building systems where AI components are first-class contributors rather than supervised assistants.
