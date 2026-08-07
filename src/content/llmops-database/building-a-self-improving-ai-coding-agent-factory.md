---
title: "Building a Self-Improving AI Coding Agent Factory"
slug: "building-a-self-improving-ai-coding-agent-factory"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "evals"
  - "harness-engineering"
  - "human-in-the-loop"
  - "cost-optimization"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "monitoring"
  - "security"
  - "guardrails"
  - "docker"
  - "microservices"
  - "devops"
  - "documentation"
  - "anthropic"
  - "openai"
  - "nvidia"
industryTags: "tech"
company: "Cursor"
summary: "Cursor, an AI-powered coding tool company, has developed an extensive internal system of specialized AI agents that automate nearly all aspects of their software development lifecycle. The problem they addressed was the increasing volume of AI-generated code requiring verification and the bottlenecks in traditional human review processes. Their solution involved creating over 150 specialized \"skills\" for agents, building automated evaluation systems, and implementing continuous hill-climbing optimization that runs for days at a time. Results include approximately 30-40% of pull requests merging without human review, dramatic increases in security vulnerability detection, and agents successfully handling complex optimization tasks like multi-day GPU kernel performance improvements for external customers like Nvidia."
link: "https://www.youtube.com/watch?v=Lsp5YZ9Jj3Q"
year: 2026
seo:
  title: "Cursor: Building a Self-Improving AI Coding Agent Factory - ZenML LLMOps Database"
  description: "Cursor, an AI-powered coding tool company, has developed an extensive internal system of specialized AI agents that automate nearly all aspects of their software development lifecycle. The problem they addressed was the increasing volume of AI-generated code requiring verification and the bottlenecks in traditional human review processes. Their solution involved creating over 150 specialized \"skills\" for agents, building automated evaluation systems, and implementing continuous hill-climbing optimization that runs for days at a time. Results include approximately 30-40% of pull requests merging without human review, dramatic increases in security vulnerability detection, and agents successfully handling complex optimization tasks like multi-day GPU kernel performance improvements for external customers like Nvidia."
  canonical: "https://www.zenml.io/llmops-database/building-a-self-improving-ai-coding-agent-factory"
  ogTitle: "Cursor: Building a Self-Improving AI Coding Agent Factory - ZenML LLMOps Database"
  ogDescription: "Cursor, an AI-powered coding tool company, has developed an extensive internal system of specialized AI agents that automate nearly all aspects of their software development lifecycle. The problem they addressed was the increasing volume of AI-generated code requiring verification and the bottlenecks in traditional human review processes. Their solution involved creating over 150 specialized \"skills\" for agents, building automated evaluation systems, and implementing continuous hill-climbing optimization that runs for days at a time. Results include approximately 30-40% of pull requests merging without human review, dramatic increases in security vulnerability detection, and agents successfully handling complex optimization tasks like multi-day GPU kernel performance improvements for external customers like Nvidia."
notion:
  pageId: "3b5f8dff-2538-80ff-a153-f93800617887"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:28:00.000Z"
  lastEditedTime: "2026-08-07T12:28:00.000Z"
  publishedAt: "2026-08-07T13:06:44Z"
---

## Overview

Cursor represents an advanced case study in LLMOps where a company building AI coding tools has turned those same tools on themselves to create what they describe as an "agent factory." The presentation, delivered by a field engineering team member who joined Cursor about a year prior to the talk, details how the company has evolved from simple autocomplete functionality to a sophisticated system of interconnected AI agents that handle most aspects of their software development lifecycle with minimal human intervention.

The company positions itself at the frontier of AI-assisted development, explicitly noting that they see themselves as "pushing the boundaries" so that others can follow. Their internal engineering practices serve as both a testing ground and a demonstration of what's possible when organizations fully commit to AI-augmented development workflows. However, the presenter acknowledges that their "agent maxing" approach, which involves using substantial compute resources and tokens, may not be applicable to every organization due to cost considerations.

## The Evolution of AI Coding and Current State

Cursor's framework for understanding the AI coding landscape identifies three distinct evolutionary stages. The first stage involved simple tab-completion and autocomplete functionality. The second stage, where most companies currently operate, involves working with discrete agents for specific tasks, whether custom-built or off-the-shelf coding agents. The third stage, which Cursor is actively exploring, involves systems of agents working together, with automatic agents autonomously tackling different areas and comprehensive evaluation frameworks becoming critical infrastructure.

Internal data from Cursor shows a significant proportion of their codebase is now AI-generated, with the percentage substantially exceeding the 30% figure cited from their external developer preferences report. More notably, a considerable amount of code making its way into the Cursor product is generated by asynchronous agents working in the background without supervision. This shift necessitated building robust verification, evaluation, and measurement systems to ensure code quality and correctness.

## The Shifted Software Development Lifecycle

The traditional multi-step SDLC has compressed into a four-step process at Cursor: agents perform planning, humans review those plans, agents build out the implementations and generate demos, and finally changes are shipped with continuous retrospectives throughout. Every stage of this process has specialized agents enabling rapid progression through the workflow.

A critical innovation was introducing artifact generation where agents create videos demonstrating their changes. When an agent adds a UI button, for example, it generates a video showing the button in action from its own testing environment. This allows for rapid human evaluation before diving into code review and represents what the presenter described as a "turning point" in their approach. The human role has shifted away from writing and reviewing code toward planning work and handling testing and deployment concerns, with increasing focus on building systems that can react to deployment feedback and self-improve over time.

## The Axe-Sharpening Philosophy

Cursor's philosophy draws from an Abraham Lincoln quote about spending most of your time sharpening your axe before chopping down trees. In their context, this means dedicating engineering effort to building the system that enables agents to function properly within the codebase rather than directly writing features. The engineering team's primary focus is improving the agent system itself through verification systems, skills, and other infrastructure enabling autonomous operation.

When this system is suboptimal—when the "axe is dull"—agents forget context, receive overly narrow task scopes, remain uncertain of their capabilities, and critically, struggle to verify their own changes. The solution involves two main pillars: providing systems with appropriate context and information, and equipping them with proper tools for verification and evaluation.

## Skills: The Knowledge Base Architecture

Skills represent a core architectural component of Cursor's agent system. These are specialized pieces of knowledge or capability that agents can access and utilize. Within their monorepo structure, Cursor maintains approximately 150 skills. A significant portion of engineering effort focuses on improving this skill set, including reducing redundancy, streamlining information, and pruning unnecessary components.

Two particularly interesting skills highlighted were the "how" and "why" skills. The "how" skill helps agents find answers about how things work within the codebase. The "why" skill searches through Slack, Notion, Git history, and other communication channels to surface the reasoning behind past decisions, providing crucial historical context that helps agents understand not just what the code does but the intentions behind architectural choices.

Skills undergo continuous improvement through reflection and refinement. Agents can read through existing skills to understand them, identify duplicates, and suggest modifications. As skills become more stable and canonical, they graduate into automations that respond to specific triggers. For example, if a documentation agent produces a result that fails an evaluation in their observability platform, this automatically triggers a diagnosis skill that analyzes log information to determine what went wrong. This creates a feedback loop where issues automatically initiate remediation processes.

## Event-Driven Agent Automation

Cursor has built an automation system allowing agents to respond to triggers from various sources including observability platforms. Entire products or projects are managed through Slack channels where agents respond to messages and trigger appropriate actions. Their build process exemplifies this approach, running almost entirely out of Slack with agents responding to events and managing the optimization pipeline.

This architecture enables sophisticated workflows like continuous hill-climbing optimization. Agents receive an end goal, relevant context, and then run autonomously for extended periods—hours or even days—to iteratively improve a metric. The longest-running agent mentioned in the presentation ran for approximately five days. A small group within the organization maintains these long-running optimization agents that work toward improving metrics like build time, response success rate, and other product signals.

An external example involved working with Nvidia to improve GPU kernel code performance. Cursor's hill-climbing agents ran for five to six days to optimize this code, demonstrating the approach's applicability beyond internal use cases. This represents a significant departure from traditional optimization workflows where humans would manually iterate on improvements.

## Verification and Evaluation Infrastructure

Verification represents the second major pillar of Cursor's LLMOps infrastructure. The system provides agents with tools to test their own work and validate success. This includes standard CI/CD pipelines and code quality tests, but extends significantly beyond traditional approaches.

Agents receive their own isolated local development environments that identically match what human developers use. This includes all local developer experience configurations pre-configured in dedicated machines where agents can work. The goal is making agent environments indistinguishable from human developer environments, enabling agents to act like typical developers. An amusing anecdote involved an agent downloading Spotify because a skill instructed it to behave like a specific developer who typically used that application, highlighting both the fidelity of environment matching and potential pitfalls of overly literal agent behavior.

These matching environments enable agents to perform computer-use style interactions, actually testing their changes and generating artifact videos as proof of functionality. The presenter showed a real example of an agent adding chat pinning functionality to the web UI, working autonomously in the background and returning a video demonstration. Beyond verification, these artifacts create valuable datasets for further agent improvement.

## Automated Code Review and Risk Scoring

Approximately 30-40% of pull requests at Cursor merge without human review, relying on automated agent-based review systems. Each review system is an agent that has been trained and evaluated against large internal datasets. The company employs specialized agents for PR review, security review, and various other checks.

Risk scoring determines which PRs require human attention. Low-risk changes with limited blast radius automatically approve, while higher-risk changes tag appropriate human reviewers. Their PR review agent, referred to as "bot bot," continuously learns from human feedback. When humans provide reactions, replies, or PR comments, these get incorporated into the agent's learned rules, ensuring mistakes aren't repeated.

The security review process has been particularly transformed by this approach. Agents conduct security-focused reviews and perform daily security scans of the entire codebase. The presenter noted with some caution that this dramatically increased the number of vulnerabilities detected, which they attribute to agents running more thorough security review processes than humans could practically maintain. The security review agents themselves are trained on data from the first half of their own human security review history, creating a system that encodes institutional security knowledge.

## Self-Driving Code Bases

Cursor's vision extends to "self-driving PRs" and "self-driving code bases" where agents automatically detect and fix issues with minimal human intervention. When CI failures occur, agents detect them, diagnose root causes, and implement fixes automatically. When code review surfaces issues, agents automatically address them. Test coverage automation ensures tests remain current without human effort.

Documentation testing runs continuously with agents verifying that documentation remains accurate and generating demonstration videos when docs describe features or workflows. Security vulnerability detection extends to confirming exploits and automatically implementing remediations.

This comprehensive automation focuses on what the presenter characterized as "drudgery work"—dependency bumping, test maintenance, security reviews, and similar tasks that are important but don't require creative problem-solving. By automating these areas, human developers can focus on higher-level planning and architectural decisions.

## Real Production Considerations and Caveats

While the presentation showcased impressive capabilities, the presenter included important caveats. The "agent maxing" approach requires substantial compute resources and token usage that may not fit every organization's budget. Cursor explicitly designs for high token consumption, representing an extreme end of the spectrum.

The system requires significant upfront investment in infrastructure—150 skills don't materialize overnight, and building specialized agents with proper evaluations demands considerable engineering effort. This aligns with their "sharpening the axe" philosophy, but organizations must weigh whether the investment makes sense for their scale and use case.

The presenter offered a diagnostic prompt that teams can use to assess their codebase and identify automation opportunities, suggesting Cursor recognizes that their full approach isn't universally applicable but that elements can be adopted incrementally.

## Model Agnosticism and Tooling

An interesting architectural decision is treating the underlying LLM layer as largely agnostic. Cursor uses models from Anthropic, OpenAI, Gemini, and their own custom models, viewing this as a "baseline intelligence layer" that sits beneath their agent system. This separation of concerns allows them to swap models or use different models for different tasks without rebuilding upper-layer systems.

Integration with observability platforms enables the event-driven automation described earlier. Tools like Arize and Phoenix connect into the agent system, providing signals that trigger diagnostic skills or other remediation workflows.

## Emergent Challenges and Future Directions

As AI-generated code becomes prevalent, new challenges emerge. More code gets accepted without deep human review, shifting time investment toward planning and deployment phases rather than writing and reviewing. Cursor is focusing engineering efforts on automating testing and deployment review, building systems that can react to deployment feedback, and enabling agents to improve their own performance over time.

The company sees the current moment as a transition point between using discrete agents and building interconnected agent systems. While many companies use agents, far fewer are building custom agent systems tailored to their specific needs. Cursor positions itself at this frontier, exploring what becomes possible when organizations commit fully to this paradigm.

## Conclusion and Practical Takeaways

Cursor's case study represents an advanced implementation of LLMOps principles where the line between tool and user blurs—they build AI coding tools and use those same tools to build themselves. Their architecture demonstrates how organizations can move beyond simple AI assistance toward comprehensive agent-driven development workflows.

Key architectural patterns include maintaining a rich skill library that agents can access, building event-driven automation that responds to signals from observability platforms, creating high-fidelity development environments for agents, implementing comprehensive automated review and verification, and continuously improving agents through feedback loops. The approach requires significant investment in infrastructure and accepts high token costs as a tradeoff for developer productivity gains.

While Cursor operates at an extreme end of the spectrum, their patterns and techniques offer insights for organizations exploring increased automation in their development workflows. The emphasis on verification, evaluation, and continuous improvement represents production-grade LLMOps rather than experimental or prototype systems. Their success with 30-40% of PRs merging without human review, multi-day autonomous optimization runs, and expanding applications to external customer problems like GPU kernel optimization demonstrates the maturity and reliability they've achieved with their agent infrastructure.
