---
title: "Building Agentic Spreadsheet Automation from Process Mining to Production"
slug: "building-agentic-spreadsheet-automation-from-process-mining-to-production"
draft: false
llmopsTags:
  - "document-processing"
  - "data-analysis"
  - "high-stakes-application"
  - "structured-output"
  - "agent-based"
  - "prompt-engineering"
  - "few-shot"
  - "harness-engineering"
  - "memory"
  - "multi-agent-systems"
  - "evals"
  - "human-in-the-loop"
  - "latency-optimization"
  - "token-optimization"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "open-source"
  - "fastapi"
  - "pytorch"
  - "redis"
  - "cache"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "databricks"
industryTags: "finance"
company: "Ramp"
summary: "Ramp developed an agentic spreadsheet editor called Ramp Sheets to automate complex finance workflows, starting from an internal process mining project that converted Loom videos of finance tasks into automation pipelines. The team evolved from black-box Python code generation to transparent spreadsheet-native operations using around 10 Excel-specific tools, leveraging Anthropic's Claude models which proved particularly effective at decomposing spreadsheet tasks. The system runs in Modal sandboxes with an agent SDK managing tool calls for reading and writing cell ranges, achieving typical execution times of 7-10 minutes per task. Beyond the core product, Ramp implemented a self-monitoring loop using their internal coding agent Inspect to automatically create DataDog monitors, and conducted research experiments in recursive language models with KV cache communication and steering vectors for model behavior modification."
link: "https://www.youtube.com/watch?v=trEM9OKr5Sc"
year: 2026
seo:
  title: "Ramp: Building Agentic Spreadsheet Automation from Process Mining to Production - ZenML LLMOps Database"
  description: "Ramp developed an agentic spreadsheet editor called Ramp Sheets to automate complex finance workflows, starting from an internal process mining project that converted Loom videos of finance tasks into automation pipelines. The team evolved from black-box Python code generation to transparent spreadsheet-native operations using around 10 Excel-specific tools, leveraging Anthropic's Claude models which proved particularly effective at decomposing spreadsheet tasks. The system runs in Modal sandboxes with an agent SDK managing tool calls for reading and writing cell ranges, achieving typical execution times of 7-10 minutes per task. Beyond the core product, Ramp implemented a self-monitoring loop using their internal coding agent Inspect to automatically create DataDog monitors, and conducted research experiments in recursive language models with KV cache communication and steering vectors for model behavior modification."
  canonical: "https://www.zenml.io/llmops-database/building-agentic-spreadsheet-automation-from-process-mining-to-production"
  ogTitle: "Ramp: Building Agentic Spreadsheet Automation from Process Mining to Production - ZenML LLMOps Database"
  ogDescription: "Ramp developed an agentic spreadsheet editor called Ramp Sheets to automate complex finance workflows, starting from an internal process mining project that converted Loom videos of finance tasks into automation pipelines. The team evolved from black-box Python code generation to transparent spreadsheet-native operations using around 10 Excel-specific tools, leveraging Anthropic's Claude models which proved particularly effective at decomposing spreadsheet tasks. The system runs in Modal sandboxes with an agent SDK managing tool calls for reading and writing cell ranges, achieving typical execution times of 7-10 minutes per task. Beyond the core product, Ramp implemented a self-monitoring loop using their internal coding agent Inspect to automatically create DataDog monitors, and conducted research experiments in recursive language models with KV cache communication and steering vectors for model behavior modification."
notion:
  pageId: "35df8dff-2538-80b4-88f5-e844d1e439ec"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:33:00.000Z"
  lastEditedTime: "2026-05-11T20:41:00.000Z"
  publishedAt: "2026-05-11T20:48:45Z"
---

## Overview

Ramp's journey building Ramp Sheets represents a comprehensive case study in evolving LLM-based automation from internal tooling to production-grade agentic systems. The project originated from a practical need within Ramp's finance team and evolved through multiple architectural iterations, ultimately becoming a publicly available product that showcases several interesting LLMOps patterns around agent design, evaluation, monitoring, and research experimentation.

The case study is particularly valuable because it demonstrates the full lifecycle of LLM production deployment, from initial experimentation through production deployment, including ongoing monitoring and continuous improvement loops. Alexander Shevchenko, head of applied AI research at Ramp, provides detailed insights into architectural decisions, tradeoffs between different approaches, and the practical considerations that drove design choices.

## Initial Problem and Process Mining Approach

The genesis of Ramp Sheets came from observing that Ramp's internal finance team communicated complex workflows primarily through Loom videos. Finance professionals would record screencasts with voiceovers explaining their processes, particularly for month-end close tasks and reconciliations. While this format was easy to produce, it was difficult for engineering teams to consume and translate into automation.

Ramp built a process mining pipeline that consumed these Loom videos and generated multiple artifacts. The system would extract both textual descriptions of the process and directed acyclic graphs representing the workflow dependencies. Interestingly, they represented these DAGs using GraphViz language with significant constraints on the graph structure, demonstrating an early pattern of using domain-specific languages as intermediate representations for LLM outputs.

The process mining system would parse videos showing finance professionals opening bank accounts, pulling invoices, accessing general ledgers, and performing reconciliations across multiple systems. The output was a library of well-documented tasks that could theoretically be automated. The initial vision was to have software engineers automate these one by one, but the team recognized an opportunity to close the loop entirely and enable finance professionals to create their own automations directly from the videos.

## Evolution from Black-Box to Transparent Automation

The team initially experimented with several automation approaches including Python code generation, N8N workflows, and Retool automations. However, all of these were rejected by finance users as too opaque or black-box. The fundamental issue was one of trust and verifiability. In finance workflows, the asymmetry between time saved and potential errors is severe - saving time is valuable, but making mistakes in financial reconciliation or reporting can have disproportionately negative consequences.

This feedback led to a critical observation: when reviewing the Loom videos, finance professionals spent approximately 99% of their time working within spreadsheets. While there were initial steps to load data from various sources, the bulk of the cognitive work happened in Excel or similar spreadsheet environments. This insight drove the decision to meet users where they already were rather than forcing them into new paradigms.

The key architectural decision was to make the automation spreadsheet-native rather than generating code that operated on spreadsheet data. Instead of having the agent write Python code with pandas dataframes that would be opaque to finance users, Ramp built an agent that directly manipulated spreadsheets using explicit operations like reading ranges, writing ranges, and setting formulas. This approach meant that finance professionals could audit the automation by reviewing the spreadsheet itself, leveraging their existing expertise in parsing Excel formulas and understanding cell relationships.

## Architecture of Ramp Sheets

The production architecture of Ramp Sheets consists of several key components working in concert. At the core is an agent SDK that manages the control loop, though this SDK evolved significantly from its origins as OpenAI's agent SDK through a "ship of Theseus" process where nearly every component was eventually customized for the specific use case.

The agent operates outside of a Modal sandbox environment, with the sandbox containing SpreadJS, a JavaScript library for Excel manipulation. This architecture choice - agent outside, tools inside - allows for clean separation of concerns and enables the team to spin up fresh sandboxes for each discrete user action to prevent pollution between code generation steps.

The agent has access to approximately 10 Excel-specific tools, which is a modest tool set compared to more general-purpose coding agents. These tools include operations like read_range, set_range, and format_range. The tools interact directly with the spreadsheet instance inside the sandbox. Notably, there is also an escape hatch for Python code generation when tasks don't naturally fit the Excel paradigm, such as complex data cleanup operations. However, the system is deliberately biased toward using Excel formulas, with code generation representing only about 5% of operations.

An interesting implementation detail is the granularity of sandboxes. Rather than maintaining one sandbox per user session or conversation, Ramp spins up a new sandbox for each discrete agentic action within a conversation. This prevents any state pollution from previous code generation attempts while maintaining the overall conversation state in the agent layer outside the sandbox.

The agent employs a reading strategy that mimics human behavior, using diagonal reading patterns rather than consuming entire spreadsheets at once to avoid context pollution. This foveated attention approach allows the agent to work with larger spreadsheets while maintaining focus on relevant regions.

## Model Selection and Performance

Ramp found that Anthropic's Claude family of models significantly outperformed OpenAI models for spreadsheet manipulation tasks, particularly at the time of the November launch. The team hypothesized that Claude had been heavily reinforcement-learned on decomposing Excel tasks into specific sequential actions. While this wasn't confirmed directly with Anthropic, the performance difference was substantial enough to be evident in practice.

More recent OpenAI models have reportedly closed the gap somewhat, but the initial architecture was heavily optimized for Claude's strengths. The team designed their 10 Excel tools to align with what they believed Claude had been trained on, following the general principle in agentic coding that tools should match the capabilities models were reinforcement-learned for. The fact that this approach worked extremely well suggests they successfully reverse-engineered aspects of Claude's training.

The system offers both fast and expert modes that users can toggle between. Task execution times vary significantly based on complexity. Simple tasks with well-defined processes and existing data can complete in 20-30 seconds. More complex tasks, particularly those requiring external data gathering like pulling SEC filings to build financial models, can run for 30-50 minutes. The average session, which may include multiple back-and-forth interactions, runs approximately 10 minutes, with about 7 of those minutes spent on agent execution.

## User Experience and Interface Design

The interface consists of a spreadsheet editor on the left where users can perform any standard Excel operations, including writing formulas manually. A key feature is the ability to select specific cell ranges and add them to context explicitly. On the right is a chat interface where users provide natural language instructions.

The system includes templates customized for specific tasks like reconciliation, and employs some generative interface patterns where the agent asks follow-up questions or creates form-like structures to gather necessary information before executing. This progressive disclosure approach helps guide users through complex workflows while maintaining the flexibility of natural language interaction.

Users interact with the system through extended conversations, building up context and iterating on their spreadsheets over time. The architecture supports this pattern while maintaining state consistency and preventing the types of errors that would erode trust.

## Evaluation and Testing Approach

Ramp's evaluation strategy reflects the practical challenges of testing complex financial workflows. They maintain labeled datasets from expert users, including historical month-end close tasks with known correct outputs. However, their evaluation approach is more nuanced than simple automated testing.

The team employs what they call "educated vibe evaluation" - having engineers who understand the financial processes manually review outputs against historical examples. While this might sound informal, it reflects a sophisticated understanding of the evaluation challenge. Financial tasks like accounts receivable reconciliation have clear structural requirements - going line by line to find and explain discrepancies - but creating comprehensive automated rubrics for LLM-as-judge evaluation would require extensive effort.

The team found that building exhaustive evaluation datasets with detailed rubrics for each task type was more expensive than having knowledgeable humans perform spot checks. They could use LLM-as-judge approaches, but the investment in creating high-quality rubrics didn't always justify the effort, especially for tasks that expert humans could evaluate quickly.

This evaluation philosophy extends to a broader insight about when to invest in automated evaluation infrastructure. Ramp has developed institutional knowledge about which product types benefit from exhaustive evaluation frameworks versus which can rely on targeted human review, and they actively look for engineers who have developed this intuition through experience.

## Self-Monitoring and Inspect Integration

One of the most innovative aspects of Ramp's LLMOps approach is their self-monitoring loop built using Inspect, an internal coding agent. Inspect is deeply integrated with Ramp's infrastructure, with pre-configured access to all systems and the ability to spin up environments like Ramp Sheets within seconds. This represents a sophisticated internal developer platform specifically optimized for agent-driven workflows.

The self-monitoring system, developed by engineer Alex Levenson, operates both on pull request creation and via nightly cron jobs. It automatically instruments Ramp Sheets with additional DataDog monitors by analyzing the codebase to identify gaps in observability. The system looks for missing metrics or monitoring coverage that should exist based on the code structure.

Critically, new monitors enter a shadow mode where they generate alerts but don't notify engineers initially. Another agent reviews these shadow alerts over time, pruning those that are too noisy while promoting high-signal monitors to production status. This filtering system was essential because initial versions spammed engineers with false positives.

The filtering heuristics consider factors like whether latency alerts are for operations users actually care about, whether P90 or P95 percentiles are within expected SLAs, and other domain-specific considerations. Claude Opus proved particularly effective at distinguishing signal from noise in this context, demonstrating sophisticated judgment about operational concerns.

When promoted monitors fire, the system both sends Slack notifications and attempts to create GitHub pull requests with fixes. For simple bugs, these PRs often merge directly. For complex architectural issues, the PRs serve more as starting points for human engineers. This represents a practical middle ground in agent capability - not fully autonomous but significantly augmenting human productivity.

The self-monitoring approach is now being productionized and platformized for use across other Ramp projects, with pilots running on additional zero-to-one internal products. This demonstrates a mature LLMOps pattern of developing capabilities on one project and then extracting them into reusable infrastructure.

## Memory Management Experiments

Ramp experimented with various memory management approaches to help the agent maintain user preferences across sessions. They implemented a simple function-calling based memory system similar to ChatGPT's approach, where users could say things like "always keep the first row blank for comments" and the agent would create a memory that gets injected into future agent runs.

However, this memory system proved less useful than anticipated. For simple preferences, the naive string-based memory worked adequately - if a user contradicted a previous preference, the agent could modify the memory directly. But for more complex workflows, like maintaining specific cell-linking patterns when building DCF models, the rudimentary system struggled to appropriately update existing memories with new information.

More fundamentally, user interaction patterns didn't show strong demand for cross-session memory. The team concluded that the specific workflows users engaged in didn't naturally lend themselves to persistent preference storage, at least not in the form they had implemented.

The team also explored embedding-based memory systems and more sophisticated context management techniques, including foveated reading where the agent dynamically determines what ranges of cells to examine rather than using fixed window sizes. Many of these experiments were ultimately discarded as the product evolved, reflecting an empirical, iteration-driven approach to capability development.

## Recursive Language Models and Latent Briefing

Beyond the core Ramp Sheets product, the team has been conducting research into more advanced agent architectures. One significant experiment involved recursive language models with a novel approach to inter-agent communication called "latent briefing."

Traditional RLMs have a top-level orchestrator agent that can programmatically spawn sub-agents, typically in a REPL-like environment. The orchestrator can call sub-agents in loops, over lists, or other programmatic patterns, which is more efficient than using tool-calling for each sub-agent invocation. In standard RLM architectures, sub-agents communicate by passing text tokens between each other.

Ramp's latent briefing experiment explored having sub-agents communicate via KV cache rather than token space. When one sub-agent completes its work, instead of generating text output that becomes input tokens for the next sub-agent, the system directly passes the KV cache with some kernel-trick-based compression to reduce size. This approach can significantly reduce token usage while maintaining or even improving accuracy.

The architecture used a closed-source Anthropic Claude model as the orchestrator but open-weight models as the worker agents, since KV cache manipulation requires model access. The research, published by Ben Geist, showed that for the same accuracy level, latent briefing substantially reduced token counts, and conversely, for the same token budget, accuracy improved.

However, this approach is most valuable for workflows where later sub-agents genuinely benefit from the context of earlier sub-agents' work. For embarrassingly parallel tasks like processing 100 pages independently, passing latent context defeats the purpose of RLMs' parallelization benefits. The technique shines when work is sequential and builds on previous progress.

## Steering Vectors and Model Interpretability

Another research direction involved steering vectors, reviving concepts from Anthropic's 2024 GoldenGate Claude experiment. That work demonstrated using steering vectors to make models obsessed with specific concepts, famously creating a model that would relate everything back to the Golden Gate Bridge.

Ramp built a system where users could specify any concept for a model to become obsessed with. The system synthetically generates approximately 80 contrastive pairs - pairs of text where one includes the target concept and one doesn't. By passing both through the model and subtracting layer activations, then averaging across all pairs, the system derives a steering vector for that concept.

The steering vector is applied at inference time to specific layers in the model, nudging token predictions toward the target concept at every generation step. This creates entertaining and revealing behaviors where the model might be asked about relationship advice but constantly brings up Jeep vehicles, for instance.

The team initially used a Qwen model but found it difficult to normalize steering vector magnitude, and the model would degrade into Mandarin due to its training corpus. Switching to a Gemma model eliminated the language-switching problem but introduced new challenges around sensitivity to steering. Gemma required careful tuning of which layers to steer and at what magnitude to avoid degenerate outputs.

The final implementation applied steering vectors to just five middle layers of Gemma, determined through extensive sweeps with Claude Opus evaluating output quality. This layer selection process revealed practical knowledge about where different types of processing occur in the model architecture - roughly distinguishing between layers responsible for core decisions versus stylistic output.

Interestingly, the steering approach sometimes creates quasi-self-aware behaviors where the model would start answering about the steered concept, then seem to catch itself and note the irrelevance before circling back to the steered concept again. This reveals something about the computational paths different circuits take through the model during generation.

While this work is more research-oriented than immediately applicable to production systems, it represents Ramp's commitment to understanding interpretability and model internals, even though these techniques aren't yet actionable for capabilities improvements.

## Team Structure and Ramp Labs

Ramp's organization includes both a production-focused Applied AI team and Ramp Labs, which serves as a playground for experimental ideas. Ramp Sheets itself originated in and continues to be developed within Ramp Labs, serving as a testbed for techniques that might later be productionized or applied elsewhere.

The hiring philosophy for Ramp Labs focuses on people with distinct spikes in specific areas that might not fit standard Applied AI roles. Examples include someone with deep interpretability expertise or an engineer with experience running an RL startup who wanted to conduct RL experiments. This "spikey" hiring approach allows Ramp to maintain research capabilities without requiring every team member to be a generalist.

For the broader Applied AI team, Ramp looks for what they describe as high agency and steep learning curves - people who might not have specific experience in an area but demonstrate the ability to rapidly acquire new skills. Practical experience building LLM systems used in production is valued, as is emerging intuition about evaluation and environment building.

The team particularly values engineers who have started developing judgment about when different evaluation approaches are appropriate - when to invest in exhaustive task lists with detailed rubrics versus when lighter-weight approaches suffice. This meta-level understanding of LLMOps tradeoffs appears to be a key competency Ramp looks for.

## Architectural Philosophy and Tradeoffs

Throughout the case study, several broader architectural philosophies emerge. Ramp consistently favors transparency and auditability over black-box efficiency, as evidenced by the choice to use explicit spreadsheet operations rather than opaque code generation. They're willing to accept potential performance costs if it builds user trust.

The team demonstrates empirical pragmatism, running many small experiments and discarding approaches that don't work rather than committing to theoretical best practices. The "ship of Theseus" evolution of their agent SDK illustrates this - they started with off-the-shelf tooling but weren't precious about replacing components as requirements evolved.

There's also a clear progression from internal tooling to external product, with the process mining origins informing but not constraining the final product design. Ramp recognized that internal users with well-defined processes needed different features than early-stage companies building from scratch, and they adapted accordingly.

The sandbox architecture reflects careful thinking about state management and isolation. By spinning up fresh sandboxes for each action rather than maintaining persistent environments per session, they avoid entire classes of state pollution bugs while accepting the overhead of environment creation.

Finally, the integration of research and production work through Ramp Labs, with bidirectional flow of ideas between experimental and production systems, represents a mature approach to innovation in LLM systems. Techniques developed in production inform research directions, while research insights gradually migrate into production systems when they prove valuable.

This case study ultimately demonstrates sophisticated LLMOps practices across the full stack - from agent architecture and tool design through evaluation, monitoring, and continuous improvement, while maintaining a research capability that pushes on fundamental techniques even when immediate production applicability is unclear.
