---
title: "Multi-Agent Software Development System with Extended Autonomous Execution"
slug: "multi-agent-software-development-system-with-extended-autonomous-execution"
draft: false
llmopsTags:
  - "code-generation"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "harness-engineering"
  - "human-in-the-loop"
  - "open-source"
  - "cicd"
  - "anthropic"
industryTags: "tech"
company: "Factory"
summary: "Factory developed a multi-agent system called Missions to address the bottleneck of human attention in software engineering, where engineers can only supervise a few tasks simultaneously despite models being capable of handling many more. The system uses a three-role architecture (orchestrators, workers, and validators) that combines delegation, creator-verifier patterns, broadcast communication, and negotiation to enable autonomous software development that can run for days or weeks. Missions have successfully executed for up to 16 days continuously, with production usage demonstrating the ability to build complex applications like Slack clones while maintaining 90% test coverage and producing cleaner codebases than the starting point."
link: "https://www.youtube.com/watch?v=ow1we5PzK-o"
year: 2026
seo:
  title: "Factory: Multi-Agent Software Development System with Extended Autonomous Execution - ZenML LLMOps Database"
  description: "Factory developed a multi-agent system called Missions to address the bottleneck of human attention in software engineering, where engineers can only supervise a few tasks simultaneously despite models being capable of handling many more. The system uses a three-role architecture (orchestrators, workers, and validators) that combines delegation, creator-verifier patterns, broadcast communication, and negotiation to enable autonomous software development that can run for days or weeks. Missions have successfully executed for up to 16 days continuously, with production usage demonstrating the ability to build complex applications like Slack clones while maintaining 90% test coverage and producing cleaner codebases than the starting point."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-software-development-system-with-extended-autonomous-execution"
  ogTitle: "Factory: Multi-Agent Software Development System with Extended Autonomous Execution - ZenML LLMOps Database"
  ogDescription: "Factory developed a multi-agent system called Missions to address the bottleneck of human attention in software engineering, where engineers can only supervise a few tasks simultaneously despite models being capable of handling many more. The system uses a three-role architecture (orchestrators, workers, and validators) that combines delegation, creator-verifier patterns, broadcast communication, and negotiation to enable autonomous software development that can run for days or weeks. Missions have successfully executed for up to 16 days continuously, with production usage demonstrating the ability to build complex applications like Slack clones while maintaining 90% test coverage and producing cleaner codebases than the starting point."
notion:
  pageId: "35df8dff-2538-8037-bc19-c1f562998a6f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:33:00.000Z"
  lastEditedTime: "2026-05-11T20:33:00.000Z"
  publishedAt: "2026-05-11T20:39:24Z"
---

## Overview

Factory, a company focused on bringing autonomy to the entire software development lifecycle, has developed an advanced multi-agent system called Missions that represents a sophisticated approach to production LLM deployment for software engineering tasks. The presenter, Luke, who previously led the development of Goose (a leading open-source coding agent that was donated to the AI Agentic AI Foundation), brings extensive experience from building developer tools at Block. The core insight driving this work is that modern software engineering is bottlenecked not by intelligence but by human attention—engineers can only actively supervise a few tasks at a time despite having backlogs of 50+ features and models being capable enough to implement all of them.

The Missions system enables autonomous software development that can run continuously for extended periods, with the longest recorded mission running for 16 days and the team believing 30-day missions are achievable. This represents a significant advancement in production LLM deployment, as most coding agents struggle to maintain coherence and correctness beyond short sessions.

## Architectural Framework and Multi-Agent Taxonomy

Factory's approach is grounded in a taxonomic understanding of five frontier multi-agent patterns, which they deliberately combine into a cohesive system:

**Delegation** involves one agent spawning sub-agents to handle specific subtasks, such as determining database schemas. This is the most common and straightforward multi-agent pattern, frequently implemented through coding tools with sub-agents.

**Creator-Verifier** establishes separation of concerns where one agent builds something and another independently checks the work. This pattern is critical because the implementing agent has cost bias—it wants its code to work—while a fresh agent with fresh context is more likely to identify issues, mirroring why humans perform code reviews.

**Direct Communication** allows agents to interact without central coordination, similar to direct messaging. However, Factory acknowledges this pattern is difficult to implement correctly because state fragments across conversations without a coordinator providing a single source of truth.

**Negotiation** occurs when agents communicate about shared resources, such as APIs or portions of a codebase. Importantly, negotiation doesn't need to be adversarial; the best use cases involve positive-sum trading where agents can achieve win-win outcomes.

**Broadcast** enables one agent to send information to many recipients, handling status updates, new context, and shared constraints. While less flashy than other patterns, broadcast is critical for maintaining coherence during long-running tasks.

Missions deliberately incorporates four of these five patterns—delegation, creator-verifier, broadcast, and negotiation—into a unified workflow, notably excluding only direct communication to maintain centralized state management.

## Three-Role Architecture

The system employs a three-role architecture that distributes responsibilities across specialized agent types:

**Orchestrators** handle planning and strategic decision-making. When users describe their goals, the orchestrator acts as a sounding board, asking strategic questions and checking for unclear requirements. It produces comprehensive plans including features, milestones, and critically, a validation contract that defines what "done" means before any coding begins. This pre-implementation definition of success criteria is fundamental to the system's ability to maintain correctness over extended execution periods.

**Workers** handle implementation with clean context, free from accumulated baggage or degraded attention. Each worker receives its specific feature specification, implements it, and commits through Git, allowing subsequent workers to inherit a clean slate and working codebase. The system runs workers serially rather than in parallel, which may seem counterintuitive but dramatically reduces error rates by eliminating conflicts, duplicate work, and inconsistent architectural decisions.

**Validators** handle verification through two distinct types: scrutiny validators and user testing validators. This dual validation approach represents a significant innovation in autonomous software development systems.

## Advanced Validation Strategy

The validation approach distinguishes Missions from typical coding agents and is central to enabling multi-day autonomous execution. Factory recognized a fundamental problem with conventional agent validation: when an agent writes code and then writes tests for that code, the tests end up shaped by the implementation rather than by the intended behavior. Tests written after implementation don't catch bugs—they confirm decisions. This leads to inevitable drift in systems attempting long-running autonomous execution.

The validation contract addresses this by being written during planning, before any code exists, defining correctness independently of implementation. For complex projects, these contracts can contain hundreds of assertions. Each feature is assigned one or more assertions it must satisfy, and the sum of all features must ensure every assertion is covered.

After each milestone of features, two validator types execute:

**Scrutiny validators** perform traditional verification including running test suites, type checking, and linting. Critically, they also spawn dedicated code review agents for each completed feature within the milestone. These review agents have never seen the code before and are not invested in the implementation, making validation adversarial by design.

**User testing validators** act as QA engineers, spawning the actual application and interacting with it through computer use or similar technologies. They fill out forms, verify pages render correctly, click buttons, and ensure functional flows work holistically. This behavioral validation asks "does this work end-to-end?" rather than just "does the code look right?" Significantly, most mission wall clock time is spent here waiting for real-world execution rather than generating tokens, representing a deliberate tradeoff prioritizing correctness over raw speed.

Neither validator type has seen the code before validation, ensuring fresh perspective and avoiding confirmation bias. This adversarial validation design is essential for catching issues that would otherwise compound over multi-day execution.

## Structured Handoffs and Context Preservation

For systems running multiple days, preserving context between agents is as critical as catching bugs. Factory implements structured handoffs where workers don't simply indicate completion but fill out detailed reports covering what was completed, what remains undone, what commands were executed with their exit codes, what issues were discovered, and whether procedures defined by the orchestrator were followed.

This structured approach enables self-healing behavior. Errors get caught at milestone boundaries, corrective work gets scoped, and the mission pulls itself back on track not by hoping agents remember what happened but by forcing them to document it and explicitly address issues. This represents a sophisticated approach to state management in multi-agent systems that many production deployments struggle with.

## Serial Execution with Targeted Parallelization

Factory made a counterintuitive architectural decision to run features serially rather than in parallel, despite parallel execution seeming like an obvious way to achieve higher throughput. Their experience showed that in software development domains, parallel agent execution leads to agents conflicting, stepping on each other's changes, duplicating work, and making inconsistent architectural decisions. The coordination overhead eliminates speed gains while burning tokens.

The Missions approach runs one worker or validator at any given time, but allows parallelization for read-only operations within features, such as searching codebases or researching APIs. Within validators, code review also parallelizes since it's read-only. This "serial execution with targeted internal parallelization" appears slower on paper but dramatically reduces error rates, and when tasks run for days, this correctness compounds significantly.

## Model Selection and Heterogeneous Deployment

A critical aspect of Factory's production LLMOps is strategic model selection across roles. Different roles benefit from different model capabilities: planning benefits from slow, careful reasoning; implementation benefits from fast code fluency and creativity; validation benefits from precise instruction following. Factory explicitly acknowledges that no single model or model provider excels at all three capabilities.

This has led to what they internally call "droid whispering"—the skill of mentally modeling how different LLMs interact, where they fail, how failures compound over multi-day runs, and deliberately choosing which model sits in which seat. The engineer who built their missions prototype, Theo, established model defaults, but Factory encourages customization based on project needs. For example, validation might use a different model provider entirely to avoid bias from the same training data.

This model-agnostic architecture provides structural advantages: you're only as strong as your weakest link, and being locked to one provider means being constrained by that family's weakest capability. As models continue specializing, the ability to place the right model in the right seat becomes a compounding advantage.

Interestingly, the structure of Missions—validation contracts, milestone checkpoints—allows successful execution even with non-frontier models, including open-weight models. The system's structure compensates for individual model limitations, which is a sophisticated production deployment strategy that acknowledges the rapidly evolving model landscape.

## Production Performance and Metrics

Factory provides concrete metrics from building a Slack clone that illuminate how the system performs in practice:

- 60% of time and tokens are spent on implementation
- Validation never succeeds on first attempt, almost always requiring follow-up features, demonstrating the value of the QA loop
- Final codebases contain 50% test code with 90% coverage
- Prompt caching is heavily leveraged to offset the cost of long-running tasks

These metrics suggest a system optimized for correctness and maintainability over raw speed, which aligns with the use case of multi-day autonomous execution.

## Enterprise Applications

Factory reports significant adoption in enterprise settings where the system has been used for:

- Prototyping new ideas and features overnight
- Building internal tools at rapid rates
- Running large-scale refactors and migrations
- Machine learning research
- Modernizing legacy codebases to make them more agent-friendly

The last use case is particularly interesting from an LLMOps perspective—using agents to prepare codebases for better agent performance represents a form of infrastructure improvement that compounds over time.

## Future-Proofing Through Prompt-Based Logic

Factory addresses a common concern among multi-agent system builders: that the next model release might make their architecture obsolete overnight. Their solution is to define almost all orchestration logic in prompts and skills (approximately 700 lines of text) rather than hard-coded state machines. How the system decomposes features and handles failures is prompt-driven, and changing just four sentences can dramatically alter execution strategy.

Worker behavior is driven by skills that the orchestrator defines per mission, enabling highly customized behavior. The only deterministic logic is thin and focused on enabling models to do what they do best while the system handles bookkeeping like running validation and blocking progress when handoff issues aren't addressed. Missions provide the discipline while models provide the intelligence using primitives they're already familiar with.

This design philosophy means the system should improve automatically with each model improvement, representing a sophisticated approach to future-proofing production LLM deployments.

## Interface and Asynchronous Operation

Standard chat interfaces don't work well for multi-day tasks, so Factory built Mission Control, a dedicated view showing project completion percentage, budget consumption, active worker status, and handoff summaries detailing what validators discovered and how the system will adjust course. This interface enables true asynchronous operation—users can engage as project managers overseeing implementation or completely disengage for extended periods.

The ability to launch a mission, approve a plan, and "go do something else" or "hang out with your friends" while the system works for days represents a fundamental shift in how software engineering work can be structured.

## Economic and Productivity Impact

Factory frames the impact in terms of changing economics: previously, a team of five engineers might work on 10 workstreams simultaneously; with Missions, this expands to 30. The team can focus on architecture and product decisions rather than execution details. Critically, Factory claims codebases end up cleaner than when they started, with end-to-end tests, unit tests, skills, and structure making both agents and humans more productive going forward.

## Critical Assessment

While Factory's presentation of Missions is compelling, it's important to note this is a product presentation with inherent bias toward showcasing successes. The 16-day mission represents their longest success, but no failure data is provided—what percentage of missions fail? How often do they require human intervention? What types of projects are unsuitable for this approach?

The claim that validation "never succeeds on the first go" and "almost always" requires follow-up features suggests significant overhead, though Factory frames this as demonstrating system value. The actual cost in tokens and wall clock time for these validation cycles isn't detailed beyond the Slack clone example.

The serial execution approach, while justified by reduced error rates, does represent a real throughput limitation. The claim that "correctness compounds" over multi-day runs is logical but would benefit from more rigorous quantification.

The system's dependence on having the "right model in the right seat" introduces operational complexity and requires the "droid whispering" skill that may be difficult to develop and maintain as the model landscape evolves rapidly. The future-proofing through prompt-based logic is elegant but unproven—major architectural model changes could still potentially disrupt the system.

Nevertheless, the architectural innovations—particularly the validation contract approach, adversarial validation design, structured handoffs, and strategic model heterogeneity—represent genuine advances in production LLM deployment for autonomous software development. The willingness to sacrifice apparent speed for correctness through serial execution and extensive validation shows mature understanding of production requirements. The system's ability to produce cleaner, more maintainable code while executing autonomously for extended periods, if validated by independent assessment, would represent significant progress in making LLM-based software development practical at enterprise scale.
