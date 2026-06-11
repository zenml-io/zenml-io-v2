---
title: "Zero Human-Written Code: Harness Engineering for Autonomous AI Agents at Scale"
slug: "zero-human-written-code-harness-engineering-for-autonomous-ai-agents-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "poc"
  - "harness-engineering"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "system-prompts"
  - "mcp"
  - "chunking"
  - "cicd"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "devops"
  - "continuous-integration"
  - "continuous-deployment"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "open-source"
  - "openai"
  - "databricks"
industryTags: "tech"
company: "OpenAI"
summary: "Ryan Lopopolo from OpenAI discusses his team's radical approach to software development where they produce zero human-written code and conduct zero human code reviews, relying entirely on AI agents for implementation. Starting in mid-2025 before reasoning models existed, the team developed \"harness engineering\" practices to enable autonomous AI agents to write production code. Through careful context management, tool design, automated testing, and asynchronous review loops, the team scaled from producing 3.5 pull requests per engineer per week with GPT-5.2 to 70 PRs per week with GPT-5.5, while maintaining code quality through programmatic guardrails and anti-slop systems. The approach emphasizes specification-driven development where human engineers focus on defining interfaces, system architecture, and functional requirements rather than implementation details."
link: "https://www.youtube.com/watch?v=MFQIKbr1IEo"
year: 2026
seo:
  title: "OpenAI: Zero Human-Written Code: Harness Engineering for Autonomous AI Agents at Scale - ZenML LLMOps Database"
  description: "Ryan Lopopolo from OpenAI discusses his team's radical approach to software development where they produce zero human-written code and conduct zero human code reviews, relying entirely on AI agents for implementation. Starting in mid-2025 before reasoning models existed, the team developed \"harness engineering\" practices to enable autonomous AI agents to write production code. Through careful context management, tool design, automated testing, and asynchronous review loops, the team scaled from producing 3.5 pull requests per engineer per week with GPT-5.2 to 70 PRs per week with GPT-5.5, while maintaining code quality through programmatic guardrails and anti-slop systems. The approach emphasizes specification-driven development where human engineers focus on defining interfaces, system architecture, and functional requirements rather than implementation details."
  canonical: "https://www.zenml.io/llmops-database/zero-human-written-code-harness-engineering-for-autonomous-ai-agents-at-scale"
  ogTitle: "OpenAI: Zero Human-Written Code: Harness Engineering for Autonomous AI Agents at Scale - ZenML LLMOps Database"
  ogDescription: "Ryan Lopopolo from OpenAI discusses his team's radical approach to software development where they produce zero human-written code and conduct zero human code reviews, relying entirely on AI agents for implementation. Starting in mid-2025 before reasoning models existed, the team developed \"harness engineering\" practices to enable autonomous AI agents to write production code. Through careful context management, tool design, automated testing, and asynchronous review loops, the team scaled from producing 3.5 pull requests per engineer per week with GPT-5.2 to 70 PRs per week with GPT-5.5, while maintaining code quality through programmatic guardrails and anti-slop systems. The approach emphasizes specification-driven development where human engineers focus on defining interfaces, system architecture, and functional requirements rather than implementation details."
notion:
  pageId: "37cf8dff-2538-8026-b519-f3d3b3d0785a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T12:33:00.000Z"
  lastEditedTime: "2026-06-11T12:33:00.000Z"
  publishedAt: "2026-06-11T12:37:49Z"
---

## Overview

This case study centers on OpenAI's internal application development team, specifically Ryan Lopopolo's work building a data analyst agent product while employing radically autonomous AI-driven development practices. The team adopted two core constraints that distinguish their approach: zero human-written code and zero human code reviews. This experiment in "harness engineering" began in mid-2025, before the release of GPT-5, during the era of early Codex CLI and models like Codex Mini. The team was building an Electron-based application that itself would serve as a data analyst agent, creating a virtuous cycle where the techniques used to build the product informed the capabilities needed within the product itself.

The evolution of this approach demonstrates a mature LLMOps practice where the focus shifts from code production to systems thinking, specification design, and trust-building mechanisms. Over the course of roughly one year, from mid-2025 to mid-2026, the team scaled their PR throughput per engineer per week from approximately 3.5 with GPT-5.2 to 70 with GPT-5.5, representing a non-linear scaling factor enabled by both model improvements and refined harness engineering practices.

## Harness Engineering Philosophy

Harness engineering represents a specific discipline within LLMOps focused on enabling AI agents to perform highly complex, autonomous software engineering tasks. The core principle recognizes that AI coding agents have only two fundamental levers: the context provided and the tools available. Harness engineering is the systematic practice of designing both context and tools to ensure agents produce trustworthy, high-quality code that aligns with business requirements and engineering standards.

The approach differs fundamentally from traditional prompt engineering or even context engineering in its holistic focus on the entire software development lifecycle. Rather than optimizing individual prompts or context windows, harness engineering considers how to structure the entire repository, documentation, testing infrastructure, and tool ecosystem so that agents can operate with minimal human intervention. This includes making nonfunctional requirements explicit, surfacing golden principles at the right time, and creating feedback loops that allow agents to learn from their mistakes.

A key insight is that tool calls themselves can be used as prompt injection mechanisms to manage the agent's context window. For example, test failures and lint errors are formatted not as exhaustive technical logs but as semantically meaningful prose messages that guide the agent toward solutions. Instead of a mechanical ESLint failure, the agent receives a message like "you made this mistake in this file, please follow the runbook in file X to fix it, because we've seen this error before and trust you to handle it correctly."

## Implementation Details and Tool Evolution

The team's development environment centered on Codex, OpenAI's AI coding agent, which evolved significantly during this period. Initially connecting to their Electron app via the Chrome DevTools Protocol using the Model Context Protocol, the infrastructure eventually shifted to a local TypeScript daemon providing a CLI interface. This change happened transparently beneath the team's workflow because it involved only 2-3 tool calls, making it more context-efficient and faster while maintaining the same dependency relationships and entity structures.

Early in the journey, when models were less capable, Ryan positioned himself as a "chunky tool" that the agent could delegate to when stuck. For instance, installing dependencies with Cargo was unreliable, so he would manually execute commands and provide results to the agent. Over time, these manual interventions were systematized into proper tool calls, reducing human involvement. This iterative automation of manual steps became a core pattern: observe where human time is spent, identify repetitive patterns, and build tools to eliminate that friction.

The team developed sophisticated context management techniques, including a GitHub issue that served as a living document of software engineering principles. Engineers and agents would leave comments describing underlying principles of good development: how to properly create React snapshot tests, write reliable network code, or structure lints. This issue grew to 100-150 comments and became the seed data for automated anti-slop systems that would spider through the codebase, identify violations, and propose corrective PRs.

## Testing, Review, and Quality Assurance

Despite the zero human code review constraint, the team maintained rigorous quality standards through programmatic guardrails and asynchronous review loops. They implemented automated CI jobs that continuously scanned for "slop" (low-quality code), compiled lists of golden principles, identified divergences, and proposed corrective pull requests. These systems employed a three-phase learning loop: produce PRs to fix violations, have humans provide thumbs-up/thumbs-down feedback with review comments, then in the next run ingest that feedback and compare it with session logs to identify mistakes and misaligned priorities.

The agent would generate markdown artifacts documenting lessons learned from human feedback, which would be saved to GitHub run artifacts and ingested in subsequent runs. This created a self-improving system where the quality of automated corrections increased over time. The team designated an on-call person to supervise headless agent work during the trust-building phase, providing the human feedback necessary to train these asynchronous loops.

Testing infrastructure was designed specifically for agent consumption rather than human readability. Test output was compressed yet semantically meaningful, providing context about what went wrong and how to fix it rather than exhaustive technical logs. The agents were particularly effective at following instructions and writing tests, contrary to typical developer behavior, making test-driven development a natural fit for this workflow.

The team also employed reviewer agents as part of their quality assurance process. Rather than shifting all quality checks left into the development process, they found it often cheaper to make small prompt adjustments to their golden principles document and let those changes propagate through the next agent runs. This represented an inversion of the traditional DevOps "shift left" mentality, where the cheapest intervention was actually a prompt change rather than deterministic tests or documentation updates.

## Onboarding and Team Scaling

The team grew by hiring new employees directly into this radical development environment, which proved advantageous as they had no baseline expectations of "normal" software development. New hires took approximately two weeks to ramp up to this way of operating. By the time the team reached five, six, or seven engineers, each new hire actually increased PR throughput by 5-10-15% within those first two weeks, rather than experiencing the typical productivity dip associated with onboarding.

This counterintuitive outcome resulted from the accumulation of context and capability in the codebase itself. Since everyone used Codex as the sole entry point, new hires immediately benefited from the best practices and judgment of all existing team members. They didn't need to spend months absorbing tribal knowledge through osmosis; instead, they could quickly contribute their own expertise and domain knowledge, which would then benefit everyone else through the shared agent interface.

The team maintained high-trust, high-throughput operations through weekly "garbage collection" sessions every Friday. These were long, synchronous stand-ups where engineers compiled lists of things they didn't like about the code produced during the week. The focus was on eliminating slop systematically and finding ways to prevent the same feedback from being given twice. This mirrors the practice of helping junior engineers internalize good practices rather than repeatedly correcting the same mistakes.

## Specification-Driven Development and Symphony

A fascinating evolution in the team's practice was the inversion of traditional spec-driven development. Rather than starting with specifications and refining them during implementation, they found it more effective to produce code first as a strawman, engage with it as a team to refine the implementation, then distill the specification from the accepted artifact. This approach recognizes that produced artifacts, whether code, spreadsheets, or documents, are information-dense records of the decisions made to create something the team deemed good.

This philosophy manifested in Symphony, a "ghost library" that exists primarily as a specification rather than a concrete implementation. The team developed Symphony through a sophisticated three-phase pipeline. First, they gave Codex the working TypeScript implementation and asked it to produce a specification markdown file that could reproduce the system. Second, a separate agent received only the spec and was asked to implement the system from scratch. Third, a judge agent compared the original implementation with the derived artifact and the spec, identifying misalignments and proposing spec changes to improve the next iteration.

This token-intensive process produced a refined specification that reliably generates the intended system while maintaining ambiguity in areas where consumers should adapt to their specific context. The result specifies business-critical logic in high detail while leaving flexibility for different toolchains, issue trackers, and repository structures. This mirrors the workflow of data science teams prototyping models in Jupyter notebooks before handing them to engineering for productionization, or designers iterating in Figma before handoff to development. The difference is that because code production is cheap, this rapid prototyping can happen directly in production systems.

## Model Evolution and Capability Improvements

The team's success correlates strongly with successive releases in the GPT-5 series. GPT-5.2, released in August 2025, represented what Ryan called the "singularity era" for coding agents. Subsequent releases brought significant capability improvements. GPT-5.3 introduced background and parallel tool calling, enabling agents to make more progress more quickly on complex changes. GPT-5.4 unified the base GPT-5 model with the Codex-specific model, combining code generation capabilities with general intelligence and strong writing skills, which allowed Codex to handle all aspects of software development beyond just code production.

GPT-5.5 introduced computer use and an embedded browser in the app, eliminating significant infrastructure complexity. Previously, driving the Electron app required booting a graphical Ubuntu container in Docker with a virtual display driver and X server, having engineers install XQuartz on their Macs to proxy to the headless host, and wiring up FFmpeg to record videos of app behavior. With computer use, this entire contraption was replaced by a single toggle. The team also developed a prototyping window where agents could launch a native rendering canvas with the full design system and component library, enabling them to prototype new screens, produce screenshots, and iterate tightly with designers.

The virtuous cycle between product development and research improvements accelerated capability gains. As the team building Codex used Codex to build Codex, and as the techniques for building the data analyst agent product informed what capabilities that product needed, improvements in the harness directly fed back into research improvements. The close coupling between the development team and research meant every point release saw capability improvements in leaps and bounds, with post-training improvements accruing leverage to every product built on the platform.

## Token Consumption and Parallel Operations

Ryan's provocative claim that it's "borderline negligent not to use a billion tokens a day" reflects a core insight about extracting intelligence from models. Token consumption correlates roughly linearly with the amount of intelligence and capability extracted, which is fundamentally why test-time compute exists. To reach billion-token-per-day consumption, developers must think beyond pair programming toward massively parallel operations with 15 or more workstreams open simultaneously.

This level of parallelization requires stepping back from hands-on coding to adopt a systems-thinking mentality similar to that of a group tech lead or engineering manager. When Ryan led developer productivity at Brex for 350 engineers, he couldn't be hands-on with every PR or system but instead had to ensure the right defaults, systems, and processes were in place for the organization to do good work. Harness engineering demands the same perspective: working through others (or through agents), steering from the background, and ensuring the right things happen by default.

Ryan's time allocation shifted from 50-70% code production before this approach to roughly 30% on the hardest refactors and zero-to-one product ideation, 30% on talking to customers and prioritization, and 30% on scheduling and staffing work. This freed him to focus on highly cross-functional, high-priority work streams while agents handled code production. The team's throughput of 70 PRs per engineer per week with GPT-5.5 would be impossible without this parallel, asynchronous operating model.

## Trust Building and Failure Modes

Building trust in autonomous agent systems required visceral experience with both failures and successes. Starting from zero capability forced close attention to where time was spent, which mistakes agents made repeatedly, and which tasks they handled reliably. This intimate understanding of failure modes proved essential for building confidence, as it revealed not just where agents struggled but where they excelled.

The team found agents particularly strong at following instructions and writing tests, suggesting a natural fit for test-driven development workflows. They also discovered that agents had no opinions about tool structure or implementation details as long as tools worked and enabled them to complete their jobs. This malleability meant infrastructure changes could happen beneath workflows without disrupting productivity, as evidenced by the Chrome DevTools Protocol implementation change that occurred without Ryan even noticing.

Trust developed through two phases. First came confidence that agents could produce code well, crystallized in a moment when Ryan prompted for voice input capability in the Electron app and saw it implemented and working half an hour later in the real app. This demonstrated that velocity was limited primarily by the capacity to schedule prompts into the "magic machine." The second phase concerned code quality and trustworthiness, which developed through the Friday garbage collection sessions, systematic slop elimination, and building programmatic guardrails that made feedback automatic rather than repetitive.

The team maintained selective human oversight for high-stakes changes, specifically complex plans and phase milestones spanning actual weeks of work. These items required human review because they functioned as prompts for agents to execute, and under-specification or over-specification would lead to poor results. Pre-merge review focused on these critical planning documents and interface definitions rather than implementation details, recognizing that these high-level artifacts provided the highest-leverage human input.

## Organizational Context and Future Implications

The approach extended beyond the immediate team into OpenAI Frontier, the enterprise platform for agents covering everything from building agents with the API and Agents SDK to observing and governing agents in enterprise environments. The single, highly-leveraged interface between the product being built and research meant post-training improvements to models accrued benefits to every product. The emergence of clear extensibility patterns through plugins, skills, and scripts provided standardized ways to inject capability into Codex via context and tools.

The team began experimenting with organizational context management, exploring how to help agents understand what work gets done in an enterprise and how data warehouses are structured and used for metrics questions. They investigated giving each agent a sidecar that continuously manages context for it, treating all agents as coding agents with access to grep-able git repositories. This represents an evolution toward enterprise-scale agentic development where the techniques for writing code translate directly to building agents for business problems.

Looking forward, Ryan suggests the industry is in a phase similar to the early days of CI/CD, where people are scrambling to figure out what patterns work before standardization emerges. The question of whether code should be more legible to agents or humans is already tilting toward specifications, reference documentation, interfaces, and system diagrams being the most important artifacts for human attention. Ryan might not even know what language certain components are implemented in, focusing instead on dependency edges and entity relationships captured in Mermaid diagrams and sequence diagrams.

The emergence of skills as a concept further reinforces this shift. Skills represent packaged, reusable capabilities that can be added to agents, abstracting away implementation details while maintaining clear interfaces. This package-manager-style approach to capability injection mirrors broader industry patterns around modularity and composability, suggesting a future where human engineers focus primarily on orchestrating and configuring agent capabilities rather than implementing them directly.

The case study ultimately demonstrates that LLMOps at scale requires rethinking fundamental assumptions about software development. The cheapest intervention is often a prompt change rather than code changes. Specifications should be distilled from working implementations rather than preceding them. Quality assurance should happen through asynchronous review loops rather than pre-merge human review. And engineers should develop expertise in systems thinking, context management, and tool design rather than code production skills. These patterns represent early but increasingly standardized practices for a future where AI agents are primary producers of software implementations.
