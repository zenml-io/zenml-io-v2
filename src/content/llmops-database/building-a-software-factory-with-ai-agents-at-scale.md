---
title: "Building a Software Factory with AI Agents at Scale"
slug: "building-a-software-factory-with-ai-agents-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "chatbot"
  - "poc"
  - "data-analysis"
  - "summarization"
  - "question-answering"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "few-shot"
  - "evals"
  - "mcp"
  - "semantic-search"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "devops"
  - "continuous-integration"
  - "continuous-deployment"
  - "databases"
  - "postgresql"
  - "redis"
  - "elasticsearch"
  - "fastapi"
  - "langchain"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "open-source"
  - "security"
  - "anthropic"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Cursor"
summary: "Cursor, a developer tool company, shares their journey of building what they call a \"software factory\" where AI agents handle increasingly autonomous software development tasks. The presentation outlines how they progressed through levels of autonomy from basic autocomplete to spawning hundreds of agents working asynchronously across their codebase. Their solution involves establishing guardrails through rules that emerge dynamically, creating verifiable systems with automated testing, and building skills and integrations that enable agents to work independently. Results include engineers managing fleets of agents rather than writing code directly, with some features being developed entirely by agents from feature flagging through testing to deployment, though significant work remains in observability, orchestration, and preventing agents from going off-track."
link: "https://www.youtube.com/watch?v=rnDm57Py54A"
year: 2026
seo:
  title: "Cursor: Building a Software Factory with AI Agents at Scale - ZenML LLMOps Database"
  description: "Cursor, a developer tool company, shares their journey of building what they call a \"software factory\" where AI agents handle increasingly autonomous software development tasks. The presentation outlines how they progressed through levels of autonomy from basic autocomplete to spawning hundreds of agents working asynchronously across their codebase. Their solution involves establishing guardrails through rules that emerge dynamically, creating verifiable systems with automated testing, and building skills and integrations that enable agents to work independently. Results include engineers managing fleets of agents rather than writing code directly, with some features being developed entirely by agents from feature flagging through testing to deployment, though significant work remains in observability, orchestration, and preventing agents from going off-track."
  canonical: "https://www.zenml.io/llmops-database/building-a-software-factory-with-ai-agents-at-scale"
  ogTitle: "Cursor: Building a Software Factory with AI Agents at Scale - ZenML LLMOps Database"
  ogDescription: "Cursor, a developer tool company, shares their journey of building what they call a \"software factory\" where AI agents handle increasingly autonomous software development tasks. The presentation outlines how they progressed through levels of autonomy from basic autocomplete to spawning hundreds of agents working asynchronously across their codebase. Their solution involves establishing guardrails through rules that emerge dynamically, creating verifiable systems with automated testing, and building skills and integrations that enable agents to work independently. Results include engineers managing fleets of agents rather than writing code directly, with some features being developed entirely by agents from feature flagging through testing to deployment, though significant work remains in observability, orchestration, and preventing agents from going off-track."
notion:
  pageId: "351f8dff-2538-807f-9280-ea5223fa8b58"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-29T07:00:00.000Z"
  lastEditedTime: "2026-04-29T07:00:00.000Z"
  publishedAt: "2026-04-29T14:10:36Z"
---

## Overview

This case study documents Cursor's internal journey to build what they describe as a "software factory" where AI agents handle increasingly autonomous development tasks. Cursor is a development environment company that heavily dogfoods its own product, using it to build and maintain their codebase while experimenting with agentic workflows. The presentation was given by Eric, an engineer working on developer experience and product at Cursor, and represents their practical experiences scaling from individual developer assistance to managing fleets of autonomous agents working across their production systems.

The core thesis is that building software at scale with AI agents requires moving through levels of autonomy, from basic autocomplete to fully autonomous "dark factories" where agents handle planning, implementation, testing, and deployment with minimal human intervention. Cursor positions themselves somewhere between level three and level four on a six-level autonomy scale, where developers act more as managers delegating work to agents rather than writing code themselves.

## Levels of Autonomy Framework

Cursor references a framework by Dan Shapiro that describes six stages of autonomy in software development. They started with basic autocomplete in 2022-2023, gradually moving up the ladder. Most users adopting AI tools currently sit between level two and level three, where they have a "pair programmer" relationship with the AI, going back and forth asking questions and getting suggestions. At level three, AI generates the majority of code while humans review outputs. Level four involves delegating as much work as possible to agents and reviewing their outputs before examining code. The ultimate level is the software factory or "dark factory" where agents autonomously ship, test, and build code with humans only providing intent and instructions.

## Motivations for Building a Factory

Cursor identifies three primary reasons for pursuing a factory model. First is throughput, enabling more code creation with fewer resources since agents can run continuously without human needs like sleep. Second is consistency, as assembly-line-style processes can produce more consistent outputs, though this requires proper guardrails to prevent agents from becoming too probabilistic. As models improve in following instructions, this consistency increases. Third is leveraging taste and creativity, allowing humans to focus on high-level decisions while agents handle execution. The presentation acknowledges that building such a factory requires significant work, drawing parallels to physical manufacturing with assembly lines, management, and observability requirements.

## Core Primitives and Patterns

The foundation of their factory approach relies on what they call primitives and patterns. This starts with codebase structure, favoring modularized and co-located code. The principle is simple: if an agent can list a folder and discover all relevant files at once rather than searching the entire codebase, it can work more efficiently in isolated parts. This mirrors human onboarding experiences. Usage patterns are equally critical, including specific methods for authentication, startup scripts, boilerplate for writing tests, and consistent architectural patterns. Agents can be pointed to existing references and asked to reproduce patterns over time, making consistency a multiplier for agent effectiveness.

The importance of structure cannot be overstated in their approach. They found that patterns that are "in distribution" for the models work dramatically better. For example, when an agent encounters a JavaScript project, it immediately checks package.json for start scripts because this pattern is heavily represented in training data. By aligning their codebase structure with common patterns, they reduce friction for agents discovering and working with code.

## Guardrails and Rules

Guardrails represent boundaries for agent freedom. Cursor implements hooks that prevent agents from touching sensitive parts of the codebase, such as encryption, authentication, or other areas where mistakes would be costly. However, their most interesting learning concerns rules. They launched a feature called Cursor rules, which led to the community-driven Cursor Directory collecting rules for various tech stacks. Initially, users assumed they should install every applicable rule, but Cursor discovered rules should emerge dynamically based on observed agent behavior. When agents go off the rails, that signals a need for a new rule. These rules function as SOPs showing agents what they can and cannot do. As models improve at following instructions, agents rarely deviate anymore, and this trend is expected to continue.

Their rules system is stored in an agents.md file that serves as a dynamic document capturing learnings over time. Rather than prescriptive upfront design, rules accumulate based on real problems encountered. This approach acknowledges that it's impossible to predict all failure modes in advance, so the system learns and adapts based on actual usage.

## Verifiable Systems and Testing

Testing and verification form a critical pillar of their factory approach. Agents must verify their own work, running tests to know if they've broken something or if changes in specific areas still pass checks. Cursor emphasizes that building verifiable systems deserves significantly more attention than it typically receives. For backend systems with clear contracts and boundaries, this is relatively straightforward through unit and integration tests. For web UI work, verification becomes more complex, requiring actual interaction with the DOM and reproduction of end-user behaviors, including details like loading spinners on buttons.

They demonstrate this with a music production app side project where the agent created end-to-end tests using Playwright. These tests spawn browsers, navigate to routes, click around, and verify functionality like play buttons and note additions. This automated testing allows changes to be made with confidence that core functionality remains intact. The emphasis on verification extends to their cloud agents, which can now record videos of themselves testing their own work, providing human-reviewable artifacts showing that changes work as expected.

## Enablers: Skills, MCPs, and Environment

Enablers represent capabilities that allow agents true freedom. Skills and MCPs provide agents with additional capabilities and access to external context. A powerful example is feature flagging, where agents are given the skill to add feature flags. This enables a complete autonomous workflow: an agent can implement a change, flag it, merge the PR, and report back that the feature is ready to try but can be easily reverted. This removes human bottlenecks from the deployment pipeline while maintaining safety through gradual rollout mechanisms.

Environment configuration is equally crucial. If agents can start dev environments without human intervention, they can be scaled infinitely on separate VMs. This leads to Cursor's architecture preference: isolated environments rather than shared workspaces. While shared workspaces allow reuse of services through git worktrees, they require branching every database, cache, and user management system to maintain reproducibility. Isolated VMs running complete stacks, including databases and internal tooling, provide true isolation and scale better despite higher costs. They run multiple thousands of agent instances daily using this approach.

## Building the Factory Checklist

Cursor follows a practical checklist when building factory components. First, is the system runnable? Can agents start everything they need? Second, is context accessible? Can agents interface with Linear, Notion, Datadog, Slack, and other tools to understand broader intent and requirements? Third, and most important, is the system verifiable? This returns to the testing emphasis, covering unit tests, integration tests, and UI tests that click through the DOM. While verification is easier for backend systems, web and UI work requires more sophisticated approaches to ensure things actually work for end users.

This checklist represents a practical distillation of their learnings. Each item addresses a category of problems they encountered when trying to run agents at scale. The accessibility point is particularly interesting, as it highlights that agents need context from the same sources humans use, whether that's project management tools, observability platforms, or communication channels.

## Demonstrating Factory Principles

The presentation includes live demonstrations using Cursor 3, a complete rewrite removing VS Code and streamlining for agent-first workflows. Using a music production app project built with the constraint of never writing code manually, Eric demonstrates the factory principles in action. The agents.md file contains rules and patterns that emerged during development, such as how to start the project and verify work. The system includes end-to-end tests the agent created itself using Playwright, enabling verification of every change without manual testing.

Another demonstration shows cloud agents with computer use capability, where agents can control computers to test their own work. The agent spawns a browser, navigates the interface, uses keyboard controls, and records video of the testing process. This provides human-reviewable artifacts showing the agent actually verified functionality, not just claimed to. These recordings use sophisticated formatting similar to screen recording tools, with zooming and highlighting to make review easier.

## Cursor 3 and Cloud Agents

Cursor 3 represents a fundamental shift in their product architecture. The traditional IDE interface with files, sidebars, and multiple panels was replaced with a more streamlined interface optimized for agent-first workflows. This architectural decision reflects their learning that managing multiple agents requires different tooling than writing code directly. The new interface provides better control panels for viewing, managing, and spawning agents, with plans for nested agent hierarchies where opening one agent reveals ten sub-agents working underneath.

Cloud agents run in isolated VMs with complete development environments. Each agent gets its own virtual machine where it can run databases, the cursor app itself, and other services. This architecture enables infinite horizontal scaling, though at higher cost than local execution. The recent addition of computer use capabilities allows agents to test their own work by controlling browsers and applications, creating video artifacts of their testing sessions. While computer use is still in early access for self-hosted scenarios, it represents a major capability addition for verification.

## Cursor Workers and Self-Hosted Infrastructure

A recent addition is Cursor Workers, which allows running the same infrastructure and orchestration layer used for cloud agents on any machine. Using the agent CLI with worker start, teams can spawn worker daemons on Mac Minis, local machines, or VMs in any cloud provider. These workers appear in the Cursor interface under self-hosted options and can be managed alongside cloud agents. This addresses cost concerns while maintaining the benefits of isolated environments and agent orchestration.

One engineer built a system running on a Mac Mini with access to iMessage, calendar, and other local services. Combined with their automations feature, this enables scheduled reports aggregating information from local systems and delivering them via Slack, web, or upcoming mobile apps. This demonstrates the flexibility of their worker architecture for creating specialized agent environments with access to specific resources or APIs.

## From Worker to Manager Mindset

A critical theme is the shift from worker to manager mindset. Engineers look at code far less frequently, instead overseeing agents doing the work. This transition means moving from synchronous to asynchronous work, as most tasks happen in the background. While developers can still inspect what individual agents are doing, as the number of agents scales, this becomes impractical. The solution is aggregating changes upward, similar to human organizational hierarchies. Small teams grow and add managers, then managers need managers, creating layers of abstraction. The same pattern applies to agents, with developers moving up abstraction levels as agent fleets grow.

This managerial role involves scoping and parallelizing work. Not all tasks can run simultaneously, particularly when agents would modify the same codebase areas and create merge conflicts. One unit of work equals one agent, so the challenge becomes decomposing long task lists into maximally parallel agent assignments. Preserving tribal knowledge becomes critical, ensuring humans understand data flows, user needs, critical systems, and safe areas for experimentation without outsourcing too much understanding to agents.

## Trust, Context, and Alignment

Moving to asynchronous work requires trusting agents more, sending them on longer tasks with more upfront context. This frontloading of context through plans or specifications enables agents to work independently for extended periods. As developers spawn more agents regularly, they develop intuition about model strengths and weaknesses, creating alignment with models. They learn how to prompt effectively and communicate intent clearly. While improving models require less explicit prompting over time, clear intent remains essential. There's no shortcut to this learning process; developers must spawn many agents, observe outcomes, and iterate. As long as safety guardrails exist, this experimentation is safe and productive.

The concept of "feeling the agents" represents experiential knowledge that only comes from extensive use. Developers learn which tasks suit particular models, when agents are likely to struggle, and how to structure prompts for success. This tacit knowledge becomes increasingly valuable as agent capabilities expand, representing a new core competency for developers working in this paradigm.

## Observability and System Thinking

As a manager of agents, developers must think systemically about where human intervention is needed and how to automate it away. Examples include copying logs from Datadog into the codebase for agent analysis, transferring user feedback from Twitter to internal systems, or exporting Notion specs to markdown for agent processing. These human-in-the-loop moments can often be automated through skills, MCPs, or separate automations. The goal is identifying and eliminating friction points in the agent workflow.

Catching agents going off track becomes critical at scale. This creates a flywheel for factory improvement: when agents create incorrect database schemas by ignoring naming conventions, that signals a need for rules. When agents produce ugly UI, that indicates missing design system awareness. Each failure mode becomes an opportunity to improve guardrails or provide better context, making the factory more robust over time. This observability focus extends to monitoring what artifacts agents produce, verifying outcomes, and ensuring agents can self-verify their work.

## Automations and Repetitive Task Identification

Scaling the factory requires identifying and automating repetitive tasks. Cursor demonstrates this with an agent that analyzes chat transcripts to identify repetitive patterns, suggesting automation opportunities. They've built numerous internal automations, including daily reviews that aggregate information from Slack and GitHub to summarize an engineer's work. This eliminates manual note-taking and reflection, instead running on a schedule with results delivered automatically.

Another automation analyzes merged PR comments to extract high-value learning. When humans review PRs and leave comments, those comments represent high-signal information about code quality and preferences. By analyzing these comments, they extract patterns that can inform agent behavior in future work. This creates a continual learning loop where human feedback is systematically captured and applied to improve agent performance.

## Agentic Code Owners

A sophisticated automation is their agentic code owner system. Traditional code owners created bottlenecks, blocking PRs when reviewers were in different time zones or unavailable. The agentic system analyzes PRs to assess risk levels. For low-risk changes like variable renaming or constant modifications, it automatically approves PRs, eliminating bottlenecks. For high-risk changes, it identifies who previously modified that code and pulls them in for review. This provides dual benefits: keeping code safe while reducing unnecessary blocking, and keeping original authors informed about changes to their areas, refreshing their context.

This system demonstrates sophisticated reasoning about both technical and organizational concerns. It balances velocity with safety, using risk assessment to determine appropriate review levels. It also implicitly maintains knowledge graphs of code ownership based on actual modifications rather than static declarations, ensuring the right expertise is consulted for complex changes.

## Continual Learning and Memory

Cursor built a continual learning plugin that analyzes previous agent transcripts to extract memories and learnings. When developers correct agents by specifying preferred components or requesting verbose descriptions, these corrections should persist rather than requiring repetition. Instead of manually creating rules each time, the plugin automatically identifies patterns in corrections and stores them as rules. This acknowledges developer laziness as a feature rather than a bug, designing systems that learn passively from interactions rather than requiring explicit rule authoring.

They distinguish this from true continual learning, which would involve adjusting model weights based on codebase and team behavior. While their current approach uses hacky plugins and external memory, the vision is baking preferences directly into models through weight adjustments. This represents a spectrum from simple rule accumulation to sophisticated model personalization, with current systems operating pragmatically in the middle while pointing toward more elegant future solutions.

## Linear Integration and Issue Automation

Their Linear integration demonstrates end-to-end automation possibilities. Every Linear ticket automatically spawns a cloud agent. For feature flags rolled out at 100% for two weeks, the system automatically creates Linear issues to remove stale flags. These issues trigger cloud agents that remove the flags automatically. Engineers only need to review and merge the code, with the feature flag lifecycle fully automated. This same pattern applies to Slack messages, where either a Slack agent or Cursor automation triages messages, checks for duplicates, and implements fixes for issues determined to be easy.

The Linear integration shows how agent systems can manage their own work queues, pulling tasks from project management systems and executing them with appropriate human oversight. This creates a continuous flow from issue identification through implementation to review, with humans involved primarily at decision points rather than execution.

## Managing Agent Costs and Efficiency

A practical concern addressed is agent cost management. Simple tasks might cost around one dollar for a single turn with cloud agents, though costs vary by model and task complexity. They run multiple thousands of agents daily, indicating significant compute expenditure. The worker architecture provides a cost-optimization path, allowing teams to run agents on their own infrastructure while maintaining orchestration benefits. However, the presentation emphasizes that proper factory setup justifies these costs through dramatically increased throughput and consistency.

The cost discussion reveals their pragmatic approach: they're willing to spend on compute because the productivity gains justify it. This represents a shift in development economics where token costs become a primary expense category alongside traditional infrastructure costs. The willingness to spawn agents liberally for experimentation, knowing many will fail, indicates confidence that successful agents generate sufficient value to offset failed attempts.

## Team Structure and Organizational Evolution

Cursor's team structure reflects their agent-first philosophy. They have PMs who coordinate internally and externally, building many prototypes themselves. Designers work roughly 50/50 in Figma and code, with all designers pushing to production. This exploratory work, like designing interfaces for nested sub-agents, requires actual development rather than static mockups. Engineers building developer tools have strong intuitive understanding of what developers want, enabling significant ownership and autonomy.

The team is organized around domains like extensibility or cloud infrastructure, with intentional modularization to avoid Conway's Law problems where organizational structure dictates system architecture. Data scientists and analysts work closely with PMs and engineers, instrumenting code appropriately and understanding feature flag impacts. This cross-functional collaboration happens within domain teams rather than through rigid handoffs, enabling faster iteration and shared context.

## Future Predictions and Open Questions

The presentation raises challenging questions about the future of engineering teams and roles. If agents can generate code at scale, what happens to teams of hundreds or thousands of engineers? Engineering roles shift toward something between product management and architecture, focusing on understanding customer needs, setting direction, determining intent, and building scaffolding for agents. The magnitude of these changes and the velocity of transition remain unclear.

Training and career progression present particular challenges. If incredibly agentic environments reduce the need for junior engineers writing code, how do new graduates gain experience? What does office politics look like when value comes from configuring agentic teams rather than programming directly? These questions suggest significant disruption to traditional software engineering career paths and organizational structures, with no clear answers yet emerging.

## Code Quality and Architecture Concerns

Audience questions raise concerns about code quality and architecture when agents ship large volumes of code with minimal human review. Agents have "completion bias," wanting to finish tasks quickly without thinking ahead about extensibility or future evolution. Cursor's response acknowledges this as a real problem, suggesting several mitigations. First, pointing agents to existing references encourages pattern consistency since models naturally continue established patterns. Second, having separate agents refactor and generalize over time, similar to human practices. Third, building systems to detect when refactoring is needed and verify that abstractions align with architectural goals.

The answer suggests more emphasis on architectural review by humans, with agents handling implementation while humans focus on system design and long-term structure. This represents a division of labor where agents excel at consistent execution within established patterns while humans maintain responsibility for high-level design decisions. However, the presentation acknowledges this remains challenging, with no perfect solution yet.

## Enterprise and Mission-Critical Concerns

For enterprise brownfield mission-critical systems with stringent security and reliability requirements, additional patterns become necessary. The key is spending compute and tokens upfront before human involvement through extensive automated testing of critical systems. Security teams can build automated sentinels that check for specific invariants, running multiple checks on PRs touching sensitive files. This represents almost red-teaming, where agents try to find problems before humans review.

The suggestion is focusing on quality over velocity, using AI to improve tests and make systems completely AI-ready rather than maximizing code generation. If humans trust the tests, they can trust outputs without examining code directly. This aligns with the overall theme of verifiable systems being the foundation for autonomous agent work, particularly in high-stakes environments where mistakes are costly.

## Practical Challenges and Real-World Friction

The presentation honestly addresses practical challenges encountered when scaling agent usage. Examples include agents spawning in wrong repositories and spending an hour trying to access the correct one, or agents calling out to Slack MCP attempting to get access in ten different ways and repeatedly failing. These failures highlight the importance of observability and circuit breakers that detect when agents are stuck or not making progress.

Loop detection, measuring whether agents touch any files at all, and instrumenting agent activity over time help identify unproductive agents. Much of this observability should happen at the platform level, but some contextual things require setup by codebase owners. The candidness about these challenges provides important balance to the optimistic vision, acknowledging that significant work remains to make agent systems truly robust and reliable at scale.
