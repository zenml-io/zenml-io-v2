---
title: "Building LangSmith Engine: A Self-Improving Agent for Agent Engineering"
slug: "building-langsmith-engine-a-self-improving-agent-for-agent-engineering"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "summarization"
  - "classification"
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "memory"
  - "cost-optimization"
  - "model-optimization"
  - "evals"
  - "human-in-the-loop"
  - "latency-optimization"
  - "error-handling"
  - "system-prompts"
  - "few-shot"
  - "langchain"
  - "docker"
  - "monitoring"
  - "databases"
  - "cicd"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "fastapi"
  - "postgresql"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "tech"
company: "LangChain"
summary: "LangChain built LangSmith Engine, an autonomous agent that continuously monitors production agent traces, identifies issues, clusters failures, and proposes code fixes to improve agent performance. The system runs on a schedule, ingesting potentially millions of traces through a sophisticated multi-agent architecture using Claude Opus for orchestration and cheaper models like Haiku for screening tasks. Engine creates an inbox of actionable issues with proposed fixes via pull requests, suggests evaluation datasets from production traces, and maintains memory through an agent overview document. The team practices dogfooding by running Engine on its own traces, which has become one of their primary methods for improving the system. They've developed specialized benchmarks and shadow production testing, achieving rapid iteration cycles where feedback from design partners in the morning can result in tested improvements by afternoon."
link: "https://www.youtube.com/watch?v=YqjR4vQwbTc"
year: 2026
seo:
  title: "LangChain: Building LangSmith Engine: A Self-Improving Agent for Agent Engineering - ZenML LLMOps Database"
  description: "LangChain built LangSmith Engine, an autonomous agent that continuously monitors production agent traces, identifies issues, clusters failures, and proposes code fixes to improve agent performance. The system runs on a schedule, ingesting potentially millions of traces through a sophisticated multi-agent architecture using Claude Opus for orchestration and cheaper models like Haiku for screening tasks. Engine creates an inbox of actionable issues with proposed fixes via pull requests, suggests evaluation datasets from production traces, and maintains memory through an agent overview document. The team practices dogfooding by running Engine on its own traces, which has become one of their primary methods for improving the system. They've developed specialized benchmarks and shadow production testing, achieving rapid iteration cycles where feedback from design partners in the morning can result in tested improvements by afternoon."
  canonical: "https://www.zenml.io/llmops-database/building-langsmith-engine-a-self-improving-agent-for-agent-engineering"
  ogTitle: "LangChain: Building LangSmith Engine: A Self-Improving Agent for Agent Engineering - ZenML LLMOps Database"
  ogDescription: "LangChain built LangSmith Engine, an autonomous agent that continuously monitors production agent traces, identifies issues, clusters failures, and proposes code fixes to improve agent performance. The system runs on a schedule, ingesting potentially millions of traces through a sophisticated multi-agent architecture using Claude Opus for orchestration and cheaper models like Haiku for screening tasks. Engine creates an inbox of actionable issues with proposed fixes via pull requests, suggests evaluation datasets from production traces, and maintains memory through an agent overview document. The team practices dogfooding by running Engine on its own traces, which has become one of their primary methods for improving the system. They've developed specialized benchmarks and shadow production testing, achieving rapid iteration cycles where feedback from design partners in the morning can result in tested improvements by afternoon."
notion:
  pageId: "397f8dff-2538-80bb-a961-e081eff02e29"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:53:00.000Z"
  lastEditedTime: "2026-07-08T20:16:00.000Z"
  publishedAt: "2026-07-08T20:19:30Z"
---

## Overview

LangChain developed LangSmith Engine as an ambitious solution to automate significant portions of the agent engineering lifecycle. The system represents a sophisticated approach to production LLM operations, where an agent monitors other agents in production, identifies their failures, and proposes actionable fixes. Ben Tanny Hill, a product manager at LangChain, describes Engine as "the agent for agent engineers," designed to address the manual steps in what they call the agent development lifecycle: building or modifying agents, running tests, deploying to production, and monitoring performance.

The motivation for Engine emerged from observing the repetitive workflow that agent engineers follow. They would deploy agents to production, use LangSmith's observability platform to monitor traces, manually identify patterns in failures, craft fixes, test those fixes, and redeploy. Engine automates much of this loop by continuously analyzing production traces, clustering similar issues, proposing code fixes through pull requests, and suggesting evaluation datasets based on real production failures.

## Architecture and Technical Implementation

Engine operates as a sophisticated multi-agent system built on LangChain's Deep Agent framework. The architecture consists of a main orchestrator agent running Claude Opus, which delegates tasks to specialized sub-agents optimized for different functions. This design mirrors organizational structures, where a competent leader delegates specific tasks to cheaper, faster specialists.

The main agent handles initial setup, memory retrieval through what they call an "agent overview document," and orchestrates the overall workflow. It then spawns screener sub-agents, which represent the primary mechanism for investigating traces. These screeners use cheaper models like Claude Haiku and are responsible for examining traces in detail to identify issues. The system also employs verifier agents that perform lightweight checks to confirm that identified traces are genuinely problematic before surfacing them as issues.

A critical technical innovation involves running the agent outside sandboxes while using sandboxes as tools. Specifically, a LangChain harness runs inside a LangSmith deployment, making calls to LangSmith sandboxes for execution. This architecture allows Engine to interact with stateful services like LangSmith itself through CLI commands while maintaining isolation for code execution.

## Handling Scale Through Context Engineering

One of Engine's most significant technical challenges involves ingesting and analyzing potentially millions of production traces cost-effectively. The team developed a sophisticated approach to context engineering that involves multiple levels of trace summarization.

The system created specialized CLI tools that produce condensed versions of traces containing only essential metadata like input, total token count, execution time, and high-level statistics. Engine performs an initial pass using these ultra-condensed views to detect obvious errors. For example, if baseline trace execution takes two minutes but ten traces exceed ten minutes, this represents a strong signal for deeper investigation without requiring full trace ingestion.

When the screener agents need more detail, they access an intermediate representation called the "messages view," which presents the conversational turns between users and agents without all the metadata overhead. Only when absolutely necessary do screeners access complete traces. This tiered approach to context management significantly reduces the cost of running an always-on monitoring agent.

The team emphasizes that many of these capabilities were purpose-built for Engine, highlighting one of the advantages of internal tooling development: Engine's requirements drove improvements to LangSmith itself, making it more "agent-friendly" and "agent-native" by exposing the right endpoints at the right levels of granularity.

## Workflow vs. Agent Autonomy

A recurring theme in Engine's development involves the tension between deterministic workflows and agent autonomy. Early versions of Engine featured more prescribed workflows where the team would pre-filter traces, make decisions about what to pass to the agent, and generally provide more structure. Over time, they discovered that stripping back these workflows and providing the agent with more autonomy often resulted in simpler designs and more efficient execution.

The team found that being too explicit about workflows led to enormous amounts of code and often inefficient processes. The power of agents lies in their ability to determine optimal workflows dynamically. However, this doesn't mean Engine operates without any guidance. The system provides substantial direction through system prompts, tool designs, and the agent overview document, but avoids hard-coding specific sequences of steps.

This evolution reflects a broader learning about agent development: resist the temptation to over-specify workflows, but provide clear capabilities and context. The team continues to experiment with this balance, adjusting when they observe inefficient behavior patterns.

## Evaluation Strategy

Evaluating Engine presents unique challenges because it performs multiple distinct tasks during its execution: finding problematic traces in large haystacks, correctly classifying issues, clustering similar problems, generating code fixes, and creating evaluation datasets. The team concluded that the most critical capability to evaluate is issue identification—finding error traces within potentially millions of okay traces.

To address this, they developed "Issue Bench," a benchmark suite comprising approximately fifty tasks focused on issue identification. A key innovation involves creating synthetic environments with pre-populated issues rather than attempting to label real production data, which would be prohibitively expensive. They use Harbor, an open-source framework that powers other benchmarks, to orchestrate these synthetic environments.

The evaluation approach involves creating mock servers and stubbing out all of LangSmith's endpoints. This addresses a crucial challenge: Engine interacts with stateful services, both reading from and potentially writing to LangSmith. Running evaluations against real LangSmith instances would be impractical and dangerous. The stub server approach allows Engine to interact with realistic but isolated environments during evaluation.

Beyond offline benchmarking, the team employs shadow production testing. They fork production tracing projects from internal agents, run development versions of Engine against these forked projects, and analyze the resulting issues without surfacing them to end users. This provides a middle ground between synthetic benchmarks and production deployment, allowing the team to assess issue quality in realistic scenarios.

The team also runs Engine on their own internal agents, including their go-to-market agent and asynchronous coding agents. Issues generated from these runs are visible to the teams managing those agents, providing continuous feedback on Engine's performance with real stakes.

## Cost Management and Model Selection

Running an always-on agent that processes potentially millions of traces presents significant cost challenges. The team regularly receives notifications that their inference costs are escalating, making cost optimization a continuous priority. Their approach involves identifying bottlenecks through detailed analysis of where costs accumulate during execution.

Model selection represents a primary optimization lever. Using state-of-the-art models like Claude Opus for every task would be prohibitively expensive. The team runs experiments to determine which tasks can be delegated to cheaper models without sacrificing quality. Screener and verifier sub-agents frequently use Claude Haiku or other less capable but faster and cheaper models for their narrowly scoped tasks.

The team has also experimented with open-source models for less challenging subtasks. Their evaluation framework supports this experimentation: they identify expensive components, hypothesize that cheaper models might suffice, implement the change, and run their evaluation suite to validate performance. This hill-climbing approach against their benchmarks allows systematic cost reduction while maintaining quality thresholds.

Currently, Engine employs what they describe as a "cocktail" of models including Claude Opus, Claude Haiku, GPT-4.5, and various Gemini models, with the specific mix changing frequently as they continue optimizing.

## User Experience and Human-in-the-Loop Design

Engine operates as an ambient agent, running on a schedule in the background rather than through direct human invocation. This design pattern creates unique user experience challenges, particularly around when and how to involve humans in the loop.

Early versions simply created pull requests for every issue detected, which quickly became overwhelming and noisy. Many proposed fixes were low quality, and even good fixes required engineers to sort through numerous PRs and understand commits. The team pivoted to an inbox model where Engine clusters issues, surfaces them with clear diagnoses, and provides context about frequency and severity.

Each issue in the inbox includes not just awareness of a problem but actionable next steps. Users can view the diagnosis, examine associated traces, review proposed fixes, and either implement them or provide feedback. The interface supports natural language feedback, allowing users to mark issues as low priority or explain why certain issue categories don't matter for their particular use case.

Memory management through the agent overview document captures user preferences and updates continuously. When users interact with issues—resolving, ignoring, or deprioritizing them—Engine incorporates this feedback into subsequent runs. This creates a self-improving cycle where Engine learns which issues matter to specific teams and adjusts its prioritization accordingly.

A significant UX insight involves recognizing that objectively real issues may simply be unimportant to particular teams. Some teams don't care about minor hallucinations or context window overflow in certain scenarios. Capturing and respecting these preferences without repeatedly surfacing unwanted issues represents an ongoing challenge.

## Rollout and Iteration Philosophy

Engine's rollout exemplifies LangChain's philosophy of shipping quickly and iterating rapidly. The team developed an early prototype called "Forge" and tested it with design partners like Credit Genie and Unifi who were familiar with agent engineering and could provide high-quality feedback. These early partners were comfortable with a rough product because they understood the vision and could clearly articulate what worked and what didn't.

The initial version simply created pull requests, which provided immediate feedback about fix quality from engineers who regularly examined LangSmith traces and understood what good fixes looked like. From there, the team gradually expanded the user base, moving from five to ten customers in March to a private beta with more users, and finally to a public launch at their Interrupt conference roughly one month before this discussion.

What makes this rapid iteration possible is the team's adoption of coding agents in their own development process. They can hear feedback from a design partner in the morning, implement meaningful changes to Engine within hours, run it again for that partner, and receive afternoon feedback. This pace would be difficult to achieve with traditional development workflows.

## Organizational Structure and Development Process

Building Engine required a different team structure than traditional product development. The team includes product engineers handling the LangSmith interface and infrastructure components like LangSmith deployments and sandboxes. But it also includes applied agent engineers who follow a distinct workflow focused on experimentation rather than traditional agile sprints.

The product engineering side works relatively conventionally: they define product outcomes, create design documents or spikes, and implement features quickly using coding agents. The agent engineering side operates through hypothesis-driven experimentation. They identify issues like excessive token usage in specific sub-agents, brainstorm potential solutions, implement multiple hypotheses throughout the week, run evaluations against them, and deploy promising changes in the latter half of the week.

These two streams overlap where product features interact with agent capabilities, requiring coordination between teams with fundamentally different development rhythms.

## Dogfooding and Self-Improvement

One of the most remarkable aspects of Engine involves the team running Engine on Engine's own traces. Initially, this seemed like it would produce low-quality results, but it has become one of their primary methods for identifying improvements to Engine itself. Engine-on-Engine represents an example of meta-level monitoring where the system improves itself by analyzing its own production behavior.

This dogfooding extends to other internal agents. The team emphasizes using Engine for all their agent engineering work, allowing them to experience the product as customers do while generating realistic test cases and uncovering edge cases.

## Future Directions

The team identifies testing as Engine's most significant gap. Currently, Engine monitors production traces and proposes fixes, but it doesn't automatically run those fixes against evaluation suites to validate them. The vision involves Engine finding issues, proposing fixes, running those fixes against evaluations including regression tests, and surfacing only validated fixes to users.

This presents substantial challenges. Running a branched version of an agent requires access to environment variables, API keys, and other context. For read-only agents that simply retrieve information, creating test environments is straightforward. But for agents that make write operations—modifying databases, sending emails, or other side effects—creating appropriate test environments becomes extremely difficult.

The team acknowledges this requires domain expertise and isn't easily automated. They're exploring whether coding agents could generate mock environments by analyzing traces to understand tool schemas and outputs, but they recognize that domain-specific knowledge often provides superior approaches. For example, for their documentation agent, rather than mocking the Mintlify API based on trace analysis, it's more effective to load markdown documentation directly from their repository and use GPT as a synthetic search engine.

Other future directions include using Engine for memory management, where it runs as background "sleeptime compute" analyzing agent interactions and proposing updates to agent memory files and skills. They've also received requests to run Engine on coding agent traces, where it would suggest adjustments to skills and agent configuration files rather than middleware and prompts.

The team views Engine as a general improvement loop applicable to various agent types—bespoke application agents, coding agents, memory-driven agents, and even Engine itself. This positions Engine as infrastructure for continuous agent improvement rather than a narrow tool for specific use cases.

## Relationship to Other LangSmith AI Features

Engine evolved from and complements other AI features in LangSmith, particularly Insights and Poly. Insights provides hierarchical clustering of traces to identify trends but lacks actionability—users must determine what to do with the patterns they observe. Poly is a chatbot embedded in LangSmith that can analyze individual traces or threads and fix prompts in the playground, offering actionability but lacking the ability to perform large-scale trace analysis.

Engine combines the strengths of both: it analyzes all traces like Insights while producing actionable fixes like Poly. However, the team recognizes that Insights provides a higher-level view of agent health and general metrics that Engine currently lacks. They're considering whether to integrate these capabilities or maintain separate tools that serve complementary purposes.

Similarly, Poly's conversational interface allows ad-hoc questions about agent performance that Engine's scheduled, batch-oriented approach doesn't support. Users might want to ask Engine questions like whether latency is getting worse across their agent, which Engine could easily answer with minor modifications but doesn't currently support.

The future likely involves deeper integration or evolution of these tools into a more unified agent that provides monitoring, analysis, actionable fixes, and interactive querying capabilities.

## Critical Perspective on Claims and Challenges

While Engine represents an impressive technical achievement, several aspects warrant balanced consideration. The team is transparent about ongoing challenges including cost management, difficulty scaling to millions of traces, and the complexities of creating test environments for agents with write access. The rapid iteration cycle enabled by coding agents is impressive but also suggests the product continues to evolve significantly, which may present stability concerns for enterprise adopters.

The shadow testing and synthetic benchmark approaches are pragmatic but may not fully capture the complexity of production environments. The team's acknowledgment that Engine still produces issues that users find unimportant or irrelevant suggests the system hasn't fully solved the problem of understanding what matters to specific teams, despite the memory and feedback mechanisms.

The vision of Engine automatically testing fixes before surfacing them remains aspirational rather than implemented, representing a significant capability gap. The challenges around creating appropriate test environments, particularly for agents with side effects, are non-trivial and may require more human involvement than the fully automated vision implies.

That said, the team's transparency about these limitations, their commitment to dogfooding their own product, and their willingness to adapt their approach based on customer feedback suggest a mature approach to LLMOps despite Engine's relative newness in the market.
