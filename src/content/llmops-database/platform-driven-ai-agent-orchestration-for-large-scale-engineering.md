---
title: "Platform-Driven AI Agent Orchestration for Large-Scale Engineering"
slug: "platform-driven-ai-agent-orchestration-for-large-scale-engineering"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "structured-output"
  - "agent-based"
  - "multi-agent-systems"
  - "mcp"
  - "prompt-engineering"
  - "rag"
  - "human-in-the-loop"
  - "memory"
  - "harness-engineering"
  - "few-shot"
  - "evals"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "langchain"
  - "crewai"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "anthropic"
  - "microsoft-azure"
industryTags: "tech"
company: "LinkedIn"
summary: "LinkedIn operates at massive scale with 1.3 billion members, 7,000 deployables, and 10,000+ repositories generating over a million PRs annually. To unlock engineering efficiency, LinkedIn built a comprehensive platform for AI agents that handles orchestration, tooling, context management, and evaluation. Rather than allowing fragmented implementations across teams, they created shared abstractions including sandbox execution environments, Model Context Protocol (MCP) for tool calling, structured context serving, and memory systems. This platform enables multiple production agents for coding, operations, testing, and analytics that execute with proper governance, safety guardrails, and human-in-the-loop oversight, dramatically reducing coordination costs and repetitive engineering work."
link: "https://www.infoq.com/presentations/ai-multi-agentic-tools"
year: 2025
seo:
  title: "LinkedIn: Platform-Driven AI Agent Orchestration for Large-Scale Engineering - ZenML LLMOps Database"
  description: "LinkedIn operates at massive scale with 1.3 billion members, 7,000 deployables, and 10,000+ repositories generating over a million PRs annually. To unlock engineering efficiency, LinkedIn built a comprehensive platform for AI agents that handles orchestration, tooling, context management, and evaluation. Rather than allowing fragmented implementations across teams, they created shared abstractions including sandbox execution environments, Model Context Protocol (MCP) for tool calling, structured context serving, and memory systems. This platform enables multiple production agents for coding, operations, testing, and analytics that execute with proper governance, safety guardrails, and human-in-the-loop oversight, dramatically reducing coordination costs and repetitive engineering work."
  canonical: "https://www.zenml.io/llmops-database/platform-driven-ai-agent-orchestration-for-large-scale-engineering"
  ogTitle: "LinkedIn: Platform-Driven AI Agent Orchestration for Large-Scale Engineering - ZenML LLMOps Database"
  ogDescription: "LinkedIn operates at massive scale with 1.3 billion members, 7,000 deployables, and 10,000+ repositories generating over a million PRs annually. To unlock engineering efficiency, LinkedIn built a comprehensive platform for AI agents that handles orchestration, tooling, context management, and evaluation. Rather than allowing fragmented implementations across teams, they created shared abstractions including sandbox execution environments, Model Context Protocol (MCP) for tool calling, structured context serving, and memory systems. This platform enables multiple production agents for coding, operations, testing, and analytics that execute with proper governance, safety guardrails, and human-in-the-loop oversight, dramatically reducing coordination costs and repetitive engineering work."
notion:
  pageId: "379f8dff-2538-80eb-8f88-fa9b3fa8669d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-08T12:10:00.000Z"
  lastEditedTime: "2026-06-08T12:10:00.000Z"
  publishedAt: "2026-06-08T12:34:05Z"
---

## Overview

LinkedIn has implemented a comprehensive platform approach to deploying AI agents across their engineering organization. Operating at extraordinary scale—1.3 billion members, 3.2 million peak queries per second, 45 trillion Kafka messages daily, and over a million pull requests annually across 10,000+ repositories—LinkedIn recognized that boosting engineering efficiency through AI could unlock massive business value. The presentation by Karthik Ramgopal (Distinguished Engineer) and Prince Valluri (Principal Engineer focused on Developer Productivity) at QCon AI 2025 details how LinkedIn moved beyond fragmented AI implementations to build a unified platform for agent orchestration, tooling, context management, and evaluation.

The fundamental insight driving LinkedIn's approach is that AI represents a new execution model for engineering, shifting the burden from humans doing repetitive cognitive work to humans expressing intent while systems execute that intent reliably. This transition requires careful platform engineering to avoid the trap of every team building their own version of orchestration, tools, context serving, and safety mechanisms—which would result in expensive repetition and inconsistent outcomes.

## Problem Space and Application Areas

LinkedIn identified three criteria for determining where to apply AI agents: the work must be repeatable, the cost of coordination must be high, and the outcome must be relatively easily validated. This led them to focus on three primary surfaces. In development, they target mechanical coding tasks like migrations (where the same change repeats across many repositories), testing workflows that are already structured, and code understanding tasks. In operations, they address deployment preparation (validating readiness, reviewing configurations, surfacing risks), reliability and pattern recognition in logs and alerts, and incident response where gathering context consumes significant time. For information retrieval, they built semantic code search capabilities and analytics query formulation with result validation.

Before AI, LinkedIn relied on conventional approaches: CLI tools ranging from simple scripts to sophisticated automation, self-serve web UIs, and extensive documentation with search indexing. The fundamental limitation was the complete absence of cognition in these systems—humans still performed all reasoning and repetitive hands-on work whenever cognition loops were involved. AI enables closing these cognition loops that were previously impossible to automate.

## Intent to Execution Framework

LinkedIn structures agent work through a clear intent-to-execution pipeline. Intent represents what needs to change, fix, migrate, or understand—expressed explicitly and structurally rather than ambiguously. A plan is the system-translated step-by-step flow determining which systems to touch in what order, what tools are needed, and what can or cannot fail. Execution involves orchestration, environment provisioning, and governance. Validation ensures every step is checked through builds, tests, static analysis, and evaluations. Output produces either responses or reviewable artifacts like pull requests with full traceability.

Human intent is rarely precise initially—people start with goals and express them incrementally with assumptions, shortcuts, and missing context. Agents lack intuition, so ambiguous intent leads to hallucinations, unsafe changes, scope creep, and inconsistent outcomes. LinkedIn addresses this by transforming messy intent into structured specifications that define clear steps (ordered, deterministic work), explicit tool constraints (defining the capability set), acceptance criteria (the definition of done including test passing and no new warnings), and guardrails (what's out of scope and which systems should not be touched). This structured specification approach ensures agents operate within defined boundaries while handling the mechanics of planning, execution, retries, and validation.

## Orchestration Layer Architecture

The orchestration layer represents the execution backbone for all agent work at LinkedIn. When a developer submits a specification—whether through chat or API—everything proceeds asynchronously from that point. The orchestrator provisions a sandbox with appropriate identity, permissions, and a consistent execution environment to ensure repeatable behavior. The agent then analyzes code, understands tasks, updates files, runs tests, and fixes issues within this isolated environment. All state is persisted so jobs can pause, retry, or resume without losing progress.

Agents access external systems exclusively through explicitly provided tools, with every tool call being scoped, permission-checked, and logged for audit. The orchestrator handles the inevitable failures (test flakes, build failures, repository unavailability) through retries and backoffs, allowing agents to focus on tasks rather than error handling. Comprehensive logging captures the agent plan, tool calls, outputs, reasoning, and code changes, with the entire trace accompanying any pull request for reviewer transparency.

LinkedIn emphasizes that orchestration matters because it transforms the system into a reliable execution machine. The same orchestration model applies whether agents are coding, debugging, responding to incidents, or performing other tasks. Without proper orchestration, identical intent can produce different outcomes depending on timing, environment, or execution order. With orchestration, identical intent reliably produces identical outcomes—a critical property for production systems.

For multi-repository tasks like library upgrades across all impacted repositories, the orchestrator first pulls the dependency graph deterministically to identify affected repositories, then provisions sandboxes for each repository. Within each sandbox, the agent follows the same structured flow: create a plan, make changes, update dependencies, run builds and tests, ensure nothing breaks, and create a reviewable PR. The workflow scales identically whether processing one repository or one hundred.

## Tooling Layer and Model Context Protocol

While orchestration provides the execution framework, actual work happens through tool calls. LinkedIn learned that agents are only as good as the tools and context provided to them. They focused on building tools with clear schemas and predictability—agents should not guess, so tools must have structured inputs and outputs with consistent shapes across invocations. All tools are versioned to enable safe evolution. Agents never hit APIs directly but always go through approved tools with explicit permissions and boundaries distinguishing read from write operations and requiring explicit privilege escalation.

A critical distinction is that agent tools differ fundamentally from human tools built around UIs and dashboards. Agent tools require proper error codes, stable interfaces, and rich context instead of raw data dumps. Noise in tool responses leads to hallucinations and poor outcomes.

LinkedIn adopted the Model Context Protocol (MCP) from Anthropic as a critical advancement in their tooling layer. MCP provides model independence—different agents powered by different models can use identical tools without coupling to proprietary function calling formats or specific APIs. Given the rapid pace of model improvement, avoiding vendor lock-in is strategically important. MCP also elevates tools beyond simple functions to full capabilities that include permissions, retry logic, schema validation, and observability hooks built directly in. When agents invoke MCP tools, they receive not just data but data with safety, structure, and contracts.

LinkedIn's widely used tools include code source tools (semantic search and dependencies for multi-repository understanding), observability tools (logs, metrics, alerts, incidents for operations), and knowledge tools (PR history, ownership, system architecture to ground agents in reality). They emphasize that agent failures rarely stem from insufficient reasoning ability—they come from missing, stale, or incomplete facts. An agent cannot know what it does not know, making comprehensive tooling essential.

## Context Management and Serving

Context represents the information that grounds agents in engineering reality. Without proper context, even sophisticated models operating in isolation will guess, hallucinate, and produce shallow results. LinkedIn provides multiple signals from different sources that together ground agents: code and dependencies across their multi-repository organization, information from past code changes (how similar problems were solved, what reviewers cared about, what broke before), and comprehensive knowledge from different systems.

One successful experiment involved creating semantic understanding from recent pull requests. When asked to upgrade Gradle to version 9, agents can find other PRs that performed similar migrations and identify commonly followed patterns, significantly improving migration quality.

Serving context effectively requires avoiding information overload. LinkedIn does not hand agents everything at once. Instead, they start with scoping based on the task to narrow the information universe to only relevant repositories and impacted services. Then they provide step-specific context—during planning, agents get dependency graphs and ownership information; during execution, they receive concrete action-specific context. This approach prevents hallucinations while avoiding context overload. Orchestration determines when to fetch information, tools determine how to fetch information, and context management controls what the agent knows.

## Memory Systems for Learning

Memory enables agents to improve over time—not becoming generally smarter, but more reliable, accurate, and aligned with expectations. Before execution, agents pull relevant memories including past successes, known failure patterns, common fixes, and reviewer feedback. This memory combines with fresh task-specific context to inform planning. Since LLMs are stateless, they must be provided with appropriate context in each call, making memory systems essential for continuity.

After execution, the system decides whether anything new is worth remembering. If a fix worked, reviewer feedback was provided, or tests broke due to changes that shouldn't be repeated, this becomes part of the learning corpus. LinkedIn distinguishes between working memory (short-lived, task-specific message history and intermediate reasoning that exists only for task duration), long-term memory (validated lessons, procedural knowledge like "this migration pattern generally works," and episodic knowledge about failure patterns), and collective memory (shared across all agents and teams, representing institutional knowledge including patterns, conventions, and best practices).

## Autonomy, Safety, and Human-in-the-Loop

LinkedIn balances agent autonomy with safety through carefully designed sandbox boundaries. Within sandboxes, agents can read and write files, query dependencies, run builds and validations, and push changes to PR branches for review—providing sufficient autonomy for meaningful engineering work. However, agents explicitly cannot deploy changes to any environment (staging or production), merge changes to main branches, make direct system calls for irreversible actions, or have unrestricted internet access.

This separation is intentional: autonomy enables speed while lack of authority maintains safety. Humans bridge this gap by making decisions and providing judgment. Human-in-the-loop is not micromanagement but higher-leverage work. Humans ensure accuracy by reviewing outputs rather than each step, provide control through approvals and rejections for merging and deployment, and teach the system through feedback that becomes training data. Every approval or rejection teaches the system what good or bad looks like.

Rather than bolting humans onto agent systems, LinkedIn designs for explicit human involvement. Agents run continuously, planning, executing, validating, and making progress without constant supervision. However, workflows include explicit pause points where judgment or authority is required. At these points, humans review artifacts, make decisions, and resolve ambiguity before agents continue. This ensures agents don't run unchecked while avoiding constant human intervention.

## Invocation Modes

LinkedIn recognizes that different use cases require different invocation patterns mirroring traditional compute paradigms. Online invocation resembles chatbot systems with synchronous requests and users waiting for responses, making latency critical. Streaming progress updates or thinking states help hide latency. Nearline invocation triggers agents based on environmental changes with throughput more important than latency, requiring asynchronous human notification mechanisms. Batch invocation runs on schedules with throughput even more critical than nearline mode, also requiring targeted asynchronous updates.

## Model Selection Strategy

LinkedIn applies a pragmatic decision tree for model selection. First, they ask whether reasoning is needed at inference time—if not, they use traditional code or rules (potentially using AI to generate the code or rules but not for runtime execution). When reasoning is needed, they evaluate quality, scale, and latency requirements. If commercial cloud-hosted models suffice, they use them. For custom requirements, they follow a customization pyramid starting at the bottom with inference API access to commercial models, attempting retrieval-augmented generation, cache-augmented generation, and sophisticated techniques like knowledge graphs before moving up the pyramid. Post-training optimization (supervised fine-tuning, reinforcement learning with human feedback, preference optimization) comes next, with pre-training only as a last resort due to operational overhead and rapid model evolution.

## Evaluation and Trust

Trust comes from consistent, repeatable results, with evaluations taking the place of traditional tests. LinkedIn emphasizes not believing in "vibes"—they require curated golden datasets exploring all input and output permutations, objective signals wherever possible, LLM-as-a-Judge patterns for subjective signals, and regression detection as systems evolve. Humans define policy and evaluation scores and offer nuance that AI systems cannot capture, but automation handles scale. LinkedIn invests heavily in tooling to visualize results since understanding where evaluations went off track is otherwise extremely difficult.

Auditability and transparency are critical. When agents run, LinkedIn captures not just prompts but tool call execution, agent state and reasoning chains, all model interactions, and environmental context. This comprehensive visibility enables debugging and continuous improvement.

## Multi-Agent Architecture

LinkedIn employs divide-and-conquer strategies through multi-agent systems working in collaboration. Their incident investigation agent serves as the user-facing facade but coordinates multiple specialized agents behind the scenes: an insights agent to understand what happened, a coding agent to make fixes, and an evaluator agent (potentially using an optimizer) to validate changes before code gets pushed and incidents are resolved. This decomposition allows specialized agents to focus on specific capabilities while a coordinating agent manages the overall workflow.

## Production Agents at LinkedIn

LinkedIn has deployed several production agents demonstrating their platform approach. They extended GitHub Copilot with custom MCP servers to inject LinkedIn-specific context that the generic Copilot lacks. For example, when developers need to make LLM calls in the LinkedIn codebase, custom MCP servers provide code search results showing examples of using LinkedIn's LLM wrapper library. This produces predictable, repeatable results consistent with how human developers should write code, reducing on-call questions and search time while meeting developers in their IDE.

The background coding agent represents one of their most sophisticated multi-agentic systems. It starts with a template-based specification describing what to code. After spec submission, tasks execute asynchronously with code changes that are context-aware of both LinkedIn engineering context and local context. Isolated sandboxes provide safety. Full audit trails accompany resulting pull requests or PR series. LinkedIn offers reusable prompt templates capturing battle-tested patterns so teams don't repeatedly solve the same problems.

The observe agent is a nearline agent triggered by alerts. When alerts fire, it comes to life to reduce on-call toil for triaging and mitigating issues. It provides a single pane of glass across different systems so engineers don't need to hunt across multiple tools. It has "elephantine memory" using tools and memory systems to pull historical insights, trends, and similar incidents for root cause analysis.

The UI QA agent addresses a specific LinkedIn challenge with server-driven UI. LinkedIn has component libraries and engines across iOS, Android, and web platforms where servers control UI. This creates validation challenges when server-side component changes affect client functionality. Traditional code-based tests cannot keep pace with dynamic UI changes. The UI QA agent executes periodic batch runs to identify regressions based on natural language test case descriptions focusing on functional specifications rather than implementation mechanics. For example, specifications state "you should be able to write a comment, and after you write the comment, it should appear in the feed update, or you should see a toast saying posted." This approach replaces both manual testing and expensive integration tests across all three platforms.

The analytics agent is a traditional online chatbot offering multimodal output (text, charts, visualizations) to help understand and analyze rich analytics data. Used by engineers, product managers, and business operations, it saves significant time for data scientists and analysts. New data sources can be easily onboarded to make the agent more intelligent, creating a decentralized and scalable development model.

## Best Practices and Lessons Learned

LinkedIn emphasizes several best practices derived from production experience. Clear specification of intent is paramount—agents should not guess or hallucinate, requiring structured specs and appropriate human-in-the-loop fallbacks since agents aren't yet fully autonomous. Investing in platform abstractions prevents repeatedly solving the same problems in slightly different ways across teams, with shared abstractions for orchestration, context engineering, tool calling, evaluation, and safety paying significant dividends.

Building smart means resisting the temptation to build everything from scratch. LinkedIn reuses extensive open-source software, open protocols, and existing systems including storage, RPC, and queuing systems. They prefer to buy or extend (as demonstrated with GitHub Copilot and MCP) over building due to the rapid pace of AI advancement. Adopting open standards enables easy interoperability and makes extension or purchase strategies viable. Most importantly, humans remain accountable for all decision-making even as agents handle increasing amounts of execution work.

## Technical Considerations and Balanced Assessment

LinkedIn's presentation provides valuable insights into production AI agent deployment at scale, but several considerations warrant balanced assessment. The platform approach clearly addresses fragmentation risks and enables consistent governance, but the initial investment required to build these abstractions is substantial and may not be justified for smaller organizations or more focused use cases. The emphasis on explicit specs and structured workflows provides safety and predictability but potentially limits agent flexibility for exploratory or creative tasks where requirements cannot be fully specified upfront.

The heavy investment in context management and memory systems recognizes a fundamental challenge with LLM-based agents—they remain dependent on information quality and availability rather than developing true understanding. The MCP adoption demonstrates strategic thinking about avoiding vendor lock-in given rapid model evolution, though the protocol's relative newness in 2025 means LinkedIn is making forward-looking bets on its ecosystem development and longevity.

The multi-agent architectures LinkedIn employs add system complexity and potential coordination failure modes compared to monolithic agent designs, though they gain modularity and specialization benefits. The human-in-the-loop approach balances safety with autonomy effectively but means these systems augment rather than replace human engineers—appropriate for current AI capabilities but requiring continuous re-evaluation as models improve.

LinkedIn's focus on evaluations and regression detection is exemplary, though they acknowledge the challenge of defining objective metrics for many software engineering tasks and the need to fall back on LLM-as-a-Judge patterns with their own reliability questions. The sandbox-based safety approach provides strong guardrails but necessarily limits what agents can accomplish autonomously, requiring human intervention for deployment and merging operations that could potentially be automated in lower-risk scenarios.

Overall, LinkedIn's platform-driven approach represents mature thinking about production AI agent deployment, emphasizing reliability, governance, and iterative improvement over bleeding-edge autonomy. Their willingness to extend existing tools like GitHub Copilot rather than building everything internally shows pragmatic engineering judgment, while their comprehensive observability and auditability infrastructure addresses the transparency challenges inherent in LLM-based systems.
