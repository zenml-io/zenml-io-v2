---
title: "Building LangSmith Engine: An Autonomous Agent for Agent Debugging and Improvement"
slug: "building-langsmith-engine-an-autonomous-agent-for-agent-debugging-and-improvement"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "chatbot"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "memory"
  - "evals"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "human-in-the-loop"
  - "few-shot"
  - "system-prompts"
  - "langchain"
  - "docker"
  - "monitoring"
  - "databases"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "fastapi"
  - "postgresql"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "meta"
industryTags: "tech"
company: "Langchain"
summary: "LangChain developed LangSmith Engine, an autonomous agent that continuously monitors production agent traces, identifies failures, clusters them into actionable issues, and proposes code fixes. The problem was the manual, time-intensive process of agent debugging where engineers had to manually review traces, identify patterns, write fixes, and run evaluations. Engine automates this cycle by running as an always-on background agent that ingests production traces, uses hierarchical agent architectures with specialized sub-agents to analyze millions of traces cost-effectively, surfaces prioritized issues in an inbox-style interface, and generates pull requests with proposed fixes along with evaluation dataset examples. Since launching publicly about a month ago after iterative development with design partners, Engine has become a core part of LangChain's agent development workflow, with the team even running Engine on Engine's own traces to find improvements in a meta-recursive improvement loop."
link: "https://www.youtube.com/watch?v=YqjR4vQwbTc"
year: 2026
seo:
  title: "Langchain: Building LangSmith Engine: An Autonomous Agent for Agent Debugging and Improvement - ZenML LLMOps Database"
  description: "LangChain developed LangSmith Engine, an autonomous agent that continuously monitors production agent traces, identifies failures, clusters them into actionable issues, and proposes code fixes. The problem was the manual, time-intensive process of agent debugging where engineers had to manually review traces, identify patterns, write fixes, and run evaluations. Engine automates this cycle by running as an always-on background agent that ingests production traces, uses hierarchical agent architectures with specialized sub-agents to analyze millions of traces cost-effectively, surfaces prioritized issues in an inbox-style interface, and generates pull requests with proposed fixes along with evaluation dataset examples. Since launching publicly about a month ago after iterative development with design partners, Engine has become a core part of LangChain's agent development workflow, with the team even running Engine on Engine's own traces to find improvements in a meta-recursive improvement loop."
  canonical: "https://www.zenml.io/llmops-database/building-langsmith-engine-an-autonomous-agent-for-agent-debugging-and-improvement"
  ogTitle: "Langchain: Building LangSmith Engine: An Autonomous Agent for Agent Debugging and Improvement - ZenML LLMOps Database"
  ogDescription: "LangChain developed LangSmith Engine, an autonomous agent that continuously monitors production agent traces, identifies failures, clusters them into actionable issues, and proposes code fixes. The problem was the manual, time-intensive process of agent debugging where engineers had to manually review traces, identify patterns, write fixes, and run evaluations. Engine automates this cycle by running as an always-on background agent that ingests production traces, uses hierarchical agent architectures with specialized sub-agents to analyze millions of traces cost-effectively, surfaces prioritized issues in an inbox-style interface, and generates pull requests with proposed fixes along with evaluation dataset examples. Since launching publicly about a month ago after iterative development with design partners, Engine has become a core part of LangChain's agent development workflow, with the team even running Engine on Engine's own traces to find improvements in a meta-recursive improvement loop."
notion:
  pageId: "391f8dff-2538-80b7-9aad-c05402b0cd3b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-02T16:15:00.000Z"
  lastEditedTime: "2026-07-02T16:15:00.000Z"
  publishedAt: "2026-07-06T07:22:52Z"
---

## Overview

LangChain built LangSmith Engine as an internal solution to address a fundamental challenge in the agent development lifecycle: the manual, labor-intensive process of debugging and improving production agents. Engine represents a novel approach to LLMOps where an agent continuously monitors other agents in production, identifies issues, and proposes concrete fixes. The case study is particularly valuable because LangChain is building tooling for the agent development space while simultaneously using those tools on their own products, creating a feedback loop that has driven both product and operational insights.

LangSmith itself is LangChain's platform for observing and evaluating agents in production. It provides observability through trace collection, evaluation through experiment running and dataset management, and various features like annotation queues and prompt playgrounds. Engine extends this by automating the next step: turning observability data into actionable improvements.

## The Agent Development Lifecycle Problem

The traditional agent engineering workflow involves several manual steps: building or modifying an agent, running tests to validate changes, deploying to production, monitoring traces in the observability tool, identifying issues, and repeating the cycle. Each of these steps requires significant manual intervention from agent engineers. Engine was designed to compress this loop by automating the monitoring, issue identification, fix generation, and test data creation phases.

## Engine Architecture and Implementation

Engine is built using LangGraph, specifically as a LangGraph agent that runs continuously on a schedule. The architecture is hierarchical with a main agent coordinating multiple specialized sub-agents. The main agent, powered by Claude Opus, acts as the brain that delegates tasks and makes complex decisions. Below it are several sub-agent types, with the screener sub-agent being the most important.

The screener sub-agents are designed for scale and cost optimization. They use cheaper, faster models like Claude Haiku and are responsible for investigating individual traces in detail. Whenever there's a need to look at a full trace rather than a summarized version, that work is delegated to a screener. This architectural pattern mirrors organizational design, with a competent leader delegating to numerous less competent but specialized and cost-effective workers who are well-suited for specific tasks like reading traces and identifying narrow problems.

The verifier sub-agent performs lightweight final checks to confirm that identified issues are truly problematic before surfacing them. There's also a sub-agent specifically for creating the issue write-ups with proper diagnosis and trace linking. The team emphasizes that this architecture is constantly evolving through experimentation, treating the agent structure similarly to designing an organizational chart.

## Trace Ingestion and Context Engineering

One of Engine's most significant technical challenges is ingesting and analyzing potentially millions of traces cost-effectively. The solution involves multiple levels of trace representation, each purpose-built for Engine's needs.

At the most compressed level, Engine uses a condensed trace view that was specifically developed for the product. This contains only high-level statistics: trace input, total token count, total execution time, and other key metrics. This representation enables rapid initial passes to detect obvious errors. For instance, if baseline traces normally take two minutes but Engine detects ten traces exceeding ten minutes, that's a strong signal worth investigating further.

The middle tier is a messages view that shows the conversational back-and-forth between user and agent without all the underlying metadata. This endpoint didn't exist before Engine and was developed to give agents more context than the high-level summary but less than the full trace. This view allows Engine to understand whether errors occurred in conversations or if users expressed frustration, providing valuable context for issue diagnosis.

The full trace representation is reserved for detailed investigation by screener sub-agents. This three-tier approach to trace representation is a key example of context engineering for agents, carefully balancing the information provided against the cost and context window limitations.

These tools are exposed through LangSmith's command-line interface, which Engine uses to interact with the platform. The team has grappled extensively with the question of whether to create deterministic workflows or give agents open-ended access to tools. Early versions of Engine involved pre-filtering traces and making decisions before the agent ran, essentially creating rigid workflows. Over time, the team has moved toward giving Engine more autonomy, allowing it to determine when to pull traces and what filtering to apply, simplifying the codebase while improving flexibility.

## Execution Environment

Engine runs inside a LangSmith deployment, another LangChain product for hosting agents. It uses LangSmith sandboxes as tools for executing scripts, meaning the agent runs outside the sandbox and makes calls into it. This architecture allows safe execution of the CLI commands and other operations without risking production systems. The entire stack is built on LangChain's own products, creating a dogfooding environment that has driven numerous product improvements.

## Clustering and Issue Identification

Engine's core value proposition is identifying needles in haystacks: finding problematic traces among potentially millions of good ones. The clustering process groups similar errors into actionable issues rather than overwhelming users with individual trace failures. This clustering is performed by the agent itself rather than through deterministic algorithms, allowing it to identify patterns that might not fit pre-defined categories.

Engine looks for several types of signals: explicit errors with error codes or exceptions, places where user needs appear unmet based on conversation analysis, and other interesting signals that suggest fixes could be made. The agent doesn't just identify errors; it classifies them into categories and determines whether new errors match existing issues or represent new problem clusters.

The team emphasizes that not all issues are equally important to users, even if they're objectively problematic. Some teams might not care about context window explosions or minor hallucinations depending on their use case. Engine learns from user feedback about which issues matter, incorporating this into its memory system.

## Memory and Agent Overview

Engine maintains memory through what the team calls an "agent overview document," essentially a markdown file that captures user preferences, agent structure, and historical learnings. This document is referenced and updated on every run, allowing Engine to learn from past interactions and user feedback.

Users can proactively provide information about their interests, important agent nodes, the distinction between sub-agents, and other structural details. More importantly, Engine learns implicitly from how users interact with issues. When users mark issues as low priority or not important, they can leave natural language feedback explaining why. This feedback is incorporated into the agent overview on subsequent runs.

The memory approach for Engine is interesting because it's a hybrid between two common patterns. Typically, agent memory is either updated during direct user interaction or through a background process that analyzes all past interactions. Engine falls in between: users never directly interact with Engine in a conversational way, but they leave feedback on issues, and then Engine picks up that feedback on its next scheduled run and updates its memory accordingly. This ambient interaction model creates a unique memory update pattern.

## Issue Surfacing and User Experience

Early versions of Engine simply created pull requests whenever it found issues, resulting in PR spam that overwhelmed users. The team quickly pivoted to an inbox model where Engine surfaces clustered issues with clear diagnoses, frequency information, and historical context showing how long issues have been occurring and what percentage of traces they affect.

Each issue in the inbox is actionable rather than merely informational. Engine provides a diagnosis, links to relevant traces, proposes specific fixes, and generates evaluation dataset examples based on the problematic traces. Users can take various actions: implementing the proposed fix, marking issues as low priority, resolving them, or ignoring them entirely. The interface is designed to guide users through a flow from understanding what's wrong to implementing and testing a fix.

This product evolution reflects a key insight about ambient agents: determining when and how to bring humans into the loop is critical. Engine does extensive work in the background but always keeps humans in the decision-making position before changes are deployed. This aligns with LangChain's philosophy of finding "bodies of work" where agents can do substantial labor but humans remain in control of final decisions.

## Fix Generation

When Engine identifies an issue, it generates a proposed fix, typically in the form of a pull request against the agent's repository. These fixes usually involve prompt modifications or middleware additions that would address the identified problem. The agent needs access to the repository structure and code to generate appropriate fixes.

Fix generation is one of the areas Engine is actively improving. While the team considers the monitoring and issue identification functionality to be strong, they acknowledge that fix generation could be significantly better. The quality of proposed fixes varies, and this is an area of ongoing development.

## Evaluation Strategy

Evaluating Engine presents unique challenges because it's a long-running, multi-phase agent that never truly stops. Engine performs several distinct tasks: finding problematic traces in large haystacks, correctly classifying issues, clustering them appropriately, generating fixes, and creating evaluation examples. Each phase could be evaluated independently, but the team has focused primarily on the most critical capability: identifying error traces from among many normal traces.

The team developed what they call "issue bench," a benchmark with approximately 50 tasks focused initially on issue identification. Using Harbor, an open-source framework that powers other benchmarks, they create synthetic environments where issues are pre-seeded. This approach avoids the labeling burden of trying to annotate tens of thousands of real traces. The synthetic environments generate traces with known issues of specific categories, allowing precise evaluation of Engine's ability to find and correctly classify them.

A major challenge for evaluation is that Engine interacts with many stateful services. It reads from and can write to LangSmith through the CLI. To prevent evaluation runs from affecting production systems, the team created stub servers that mock out all the different endpoints. This allows Engine to make the same API calls it would in production but receive controlled responses. This approach to creating hermetic evaluation environments for stateful agents is particularly noteworthy as it likely generalizes to other long-running agent applications.

Beyond offline benchmarking, Engine uses shadow production testing. The team runs Engine on forks of their internal agent tracing projects, creating issues that aren't visible to the actual teams working on those agents. This allows rapid iteration on Engine without creating noise for internal users while still testing against realistic data.

The team also practices true production usage on their internal agents, including their go-to-market agent and asynchronous coding agents. These teams actually view and interact with the issues Engine creates, providing valuable feedback. The rapid iteration cycle is notable: feedback received in the morning can lead to Engine modifications and re-runs in the afternoon, with new feedback by end of day. This pace is enabled by coding agents that allow meaningful changes to be shipped in hours.

## Production Metrics and Observability

Engine is extensively instrumented with multiple layers of observability. Basic database metrics track which customers have Engine running, activation status, run frequency, and trace ingestion counts. Engine reports its own operational metrics including the number of traces analyzed, trace sizes, and run latency, helping the team understand performance across different customer environments.

User engagement analytics track how customers interact with issues: view rates, feedback patterns, fix implementation rates, and adjustments to proposed solutions. The team uses Hex, an AI-powered analytics agent, extensively to create new dashboards daily based on evolving questions, demonstrating their multi-agent environment.

In a particularly meta twist, Engine runs on its own traces. Initially conceived as a joke, the team assumed running Engine on Engine traces would be useless, but it has become one of their primary methods for finding improvements. This recursive self-improvement loop creates a continuous feedback mechanism where the product improves itself, though the team still makes manual changes based on Engine's suggestions rather than automatically implementing them.

## Cost Optimization

Cost management is a constant concern for Engine given its always-on nature and the scale of trace data it processes. The team receives regular alerts when inference costs spike and treats cost optimization as an ongoing experimentation area. The approach involves identifying bottlenecks, hypothesizing improvements, and hill-climbing against evaluations.

Model selection is the primary cost optimization lever. Using state-of-the-art models like Claude Opus for every task, including screener sub-agents, would be prohibitively expensive. The team uses a cocktail of models: Claude Opus for the main agent, cheaper models like Claude Haiku for screeners and verifiers, OpenAI's models where appropriate, and has experimented with Gemini and open-source models for less challenging tasks.

The hierarchical agent architecture is itself a cost optimization strategy, allowing expensive capable models to delegate to cheaper specialized models for well-defined subtasks. The three-tier trace representation system similarly reduces cost by ensuring agents only pull the minimum context necessary for each decision.

## Rollout and Iteration Strategy

Engine's development followed a classic expanding blast radius approach. The earliest version, then called Forge, ran with a small number of design partners like Credit Genie and Unify. These early versions generated PRs directly, often with poor quality, but the feedback from these agent engineering teams was invaluable since they were intimately familiar with their agents and the types of errors to expect.

Around March, the team expanded to a private beta of five to ten customers with a basic interface within LangSmith. This interface was admittedly low quality but sufficient for gathering feedback about the product experience. At their Interop conference, they launched a more generally available version, expanding the user base significantly and receiving a deluge of feedback.

The team emphasizes shipping quickly and iterating rapidly, a company-wide philosophy that Engine exemplifies. Initial versions were shipped remarkably fast, and the team grew the user base incrementally from internal agents to two design partners, then twenty design partners at GA launch. The fast iteration cycle was enabled by coding agents that allow shipping meaningful changes within hours of receiving feedback.

## Team Structure and Development Process

The Engine team has a unique structure reflecting the hybrid nature of the product. It includes traditional product engineers building the user interface and other standard features, infrastructure engineers handling deployments and sandboxes, and a newer category: applied agent engineers. Each group has different development processes.

Product engineering still follows relatively traditional agile practices, though accelerated by coding agents. Applied agent engineering works differently, following an experimentation flow. The team identifies performance issues like high token usage or latency, develops hypotheses for improvement, tests them throughout the week against evaluations, and typically implements validated improvements by week's end. This research-oriented process differs markedly from traditional sprint-based development.

There are natural overlap points where the two development styles intersect, requiring coordination. The separation allows each discipline to work in its optimal mode while collaborating where necessary.

## Relationship to Other LangSmith AI Features

LangSmith previously had two AI features: Insights and Polly. Insights performed hierarchical clustering on traces to identify trends and patterns but wasn't actionable. Polly was a chatbot focused on specific contexts like analyzing individual traces or threads and fixing prompts in the playground. Polly provided actionable suggestions but couldn't perform large-scale trace analysis.

Engine combines the best of both: it runs over all traces like Insights while producing actionable outputs like Polly. However, Engine lacks some capabilities of its predecessors. Insights provided a zoomed-out view of agent health and general metrics that Engine doesn't offer. Users might look at fifteen issues in Engine and conclude something is majorly broken when they're actually minor issues, lacking the health overview Insights provided.

Engine also doesn't currently support conversational interaction. Users receive a list of issues rather than being able to ask questions like "Is my latency getting worse across my agent?" Such queries are well within Engine's technical capabilities but aren't supported by the current interface. The team is exploring whether these features should be integrated into Engine or remain separate capabilities that work together.

## Future Directions

The most significant capability Engine lacks is comprehensive testing. Currently, Engine finds issues and proposes fixes, but users must run their own evaluations before deploying changes. Engine does create evaluation dataset examples from problematic production traces, but it doesn't run experiments with the proposed fixes against those evaluations.

The vision is for Engine to propose fixes that are already tested and hardened, allowing it to say with confidence that a fix addresses the issue without regressing other inputs. This would complete the automation loop from monitoring through testing. However, implementing this faces significant challenges.

The first challenge is running branched versions of agents. When Engine proposes a fix via PR, actually running that modified agent requires access to all environment variables, API keys, and infrastructure. Making code changes is easy; executing the changed agent in a proper environment is hard.

The second challenge involves agents that make real-world modifications. For read-only agents, running branched versions against production data sources is safe since there are no side effects. For agents that write to databases, send emails, or otherwise modify state, running evaluations against production systems is dangerous. This requires creating evaluation environments with mocked-out services.

The team's experience creating stub servers for Engine's own evaluations illustrates this challenge. For their documentation agent Chat LangChain, they considered creating a synthetic environment by analyzing traces to understand questions asked, tools used, and data accessed, then having a coding agent generate a mock server. However, the best approach was actually to use the markdown documentation from their repository, create synthetic questions from it, and use simple grep-like search as the mock retrieval system. This domain-specific solution couldn't be automatically derived from traces alone.

This highlights a fundamental challenge: creating proper evaluation environments requires domain expertise that's difficult to automate. The team views this as an open research question where automation might help in some scenarios, but human involvement will likely remain necessary for others.

## Additional Use Cases

Beyond debugging production agents, Engine has potential applications to other agent types. One explored direction is memory management. The team demonstrated using Engine as sleep-time compute for long-term memory, where all agent interactions are traced to LangSmith, and Engine runs over those traces in the background, suggesting changes to the agent's memory files and skills in context hub. When merged, these updates inform future agent runs, creating a memory improvement loop.

Another direction is running Engine on coding agent traces. This is similar to debugging production agents but focuses on modifying skills and agent configuration files rather than prompts and middleware. The clustering and issue identification processes remain the same, but fixes manifest as skill creation or modification. This connects to the memory use case since both involve updating the agent's knowledge representation rather than its core logic.

The team also runs Engine on Engine's own traces, creating a recursive improvement loop. Initially conceived as an experiment unlikely to work, it has become one of their primary methods for finding Engine improvements. This meta-application validates Engine's general applicability to any agent that produces traces.

## Broader LLMOps Insights

This case study illuminates several broader themes in production LLM systems. The tension between workflows and agentic systems is central: teams are constantly deciding what to hardcode versus what to let agents determine. Early instincts favor explicit workflows, but LangChain found that progressively removing constraints and trusting the agent often yields simpler, more effective systems.

The importance of context engineering for agents is clear. Creating multiple representations of the same data at different granularities, with purpose-built endpoints for agent consumption, significantly impacts both capability and cost. This suggests that making systems "agent-native" requires thoughtful API design beyond what human-oriented APIs provide.

The evaluation challenges for long-running, stateful agents are substantial. Creating synthetic environments, mocking stateful services, and finding the right evaluation granularity requires significant investment. The industry likely needs better frameworks and patterns for this class of problem.

Cost optimization for production agents requires systematic experimentation. The combination of model selection, architectural choices like sub-agents, and context management creates a large optimization space. Treating this as a hill-climbing problem against evaluations, with hypotheses about bottlenecks, provides a systematic improvement path.

Finally, the case study validates the power of dogfooding in the agent development tool space. Building tools for agent engineers while being agent engineers creates tight feedback loops that drive both product and operational excellence. The fact that Engine runs on its own traces exemplifies this recursive improvement potential in LLM systems.
