---
title: "Building PAT: An AI Analyst for Investment Research at Scale"
slug: "building-pat-an-ai-analyst-for-investment-research-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "unstructured-data"
  - "high-stakes-application"
  - "visualization"
  - "question-answering"
  - "rag"
  - "prompt-engineering"
  - "reranking"
  - "semantic-search"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "system-prompts"
  - "evals"
  - "human-in-the-loop"
  - "cache"
  - "fastapi"
  - "security"
  - "guardrails"
  - "databases"
  - "anthropic"
industryTags: "finance"
company: "Bridgewater"
summary: "Bridgewater Associates developed PAT (Pocket Analyst Tool), an internal AI analyst system designed to perform hours of expert investment research in minutes. The system was built to help hundreds of investors conduct deep analytical work by accessing both structured time series data and unstructured research documents, using proprietary tools, and leveraging 50 years of codified investment knowledge. PAT was deployed internally several months prior to this presentation and features a sophisticated multi-agent architecture that includes parallel code generation, deterministic execution, and a continuous learning system where agents autonomously review interactions to improve performance. The tool successfully reduced analysis time from days to minutes while maintaining the high correctness standards required for financial decision-making."
link: "https://www.youtube.com/watch?v=lXZb21CfeIY"
year: 2026
seo:
  title: "Bridgewater: Building PAT: An AI Analyst for Investment Research at Scale - ZenML LLMOps Database"
  description: "Bridgewater Associates developed PAT (Pocket Analyst Tool), an internal AI analyst system designed to perform hours of expert investment research in minutes. The system was built to help hundreds of investors conduct deep analytical work by accessing both structured time series data and unstructured research documents, using proprietary tools, and leveraging 50 years of codified investment knowledge. PAT was deployed internally several months prior to this presentation and features a sophisticated multi-agent architecture that includes parallel code generation, deterministic execution, and a continuous learning system where agents autonomously review interactions to improve performance. The tool successfully reduced analysis time from days to minutes while maintaining the high correctness standards required for financial decision-making."
  canonical: "https://www.zenml.io/llmops-database/building-pat-an-ai-analyst-for-investment-research-at-scale"
  ogTitle: "Bridgewater: Building PAT: An AI Analyst for Investment Research at Scale - ZenML LLMOps Database"
  ogDescription: "Bridgewater Associates developed PAT (Pocket Analyst Tool), an internal AI analyst system designed to perform hours of expert investment research in minutes. The system was built to help hundreds of investors conduct deep analytical work by accessing both structured time series data and unstructured research documents, using proprietary tools, and leveraging 50 years of codified investment knowledge. PAT was deployed internally several months prior to this presentation and features a sophisticated multi-agent architecture that includes parallel code generation, deterministic execution, and a continuous learning system where agents autonomously review interactions to improve performance. The tool successfully reduced analysis time from days to minutes while maintaining the high correctness standards required for financial decision-making."
notion:
  pageId: "3aaf8dff-2538-8024-a7fc-f9cf12c477e1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T11:57:00.000Z"
  lastEditedTime: "2026-07-27T11:57:00.000Z"
  publishedAt: "2026-07-27T12:13:06Z"
---

## Overview

Bridgewater Associates, a systematic macro hedge fund with a 50-year history, built PAT (Pocket Analyst Tool) to augment their investment research process. The presentation was delivered by Brendan McManus (team lead of applied AI), Michael Ran (investor lead), and Santi Weight (technical lead). PAT represents one component of Bridgewater's broader vision to build a fully artificial investor capable of performing the complete range of activities that human investors perform daily. The tool was designed specifically for the investigation and analytical portion of the research process, focusing on deep exploratory research that would typically take human analysts days or weeks to complete.

The strategic context for PAT is particularly important. Bridgewater has spent decades building expert systems that encode market and economic knowledge in both machine-readable and human-readable formats. This foundation, starting from handwritten trading rules on legal pads in 1980, has created what the team describes as a tremendous trove of data and codified knowledge. This existing infrastructure positioned them well for the AI era, as they didn't need to retroactively document their processes for agents—the knowledge was already available in structured form.

## Research Process and Agent Architecture

Bridgewater conceptualizes their investment process as a research circle where investors continuously perceive external events, formulate questions, perform analytical investigations, synthesize findings, and contribute learnings back to a shared knowledge base. The vision is to build discrete sub-agents for each portion of this research circle, all drawing upon the same 50 years of accumulated understanding. PAT specifically addresses the investigation component, enabling investors to pursue questions they previously lacked the bandwidth to explore.

PAT was designed with several fundamental requirements from day one. It needed to search across and read all internal data, both structured time series data spanning decades and unstructured content like broker-dealer research and internal memos. The tool had to use all proprietary visualization, diagnostic, and evaluation tools that human analysts access. Given that many analyses would take human analysts many hours to run due to their complexity, PAT's analyses needed to be completely diagnosable—not just for humans but also for agents running in the background to verify correctness. The system was designed with full knowledge of Bridgewater's investment processes and frameworks, leveraging the 50 years of documented methodology. Finally, PAT had to learn and compound its learning across all investors at the firm, not just for individual users.

## Production Deployment and Learning Flywheel

At the time of the presentation, PAT had been deployed internally for several months with hundreds of investors using it daily. This production deployment established a continuous improvement flywheel: as investors use PAT for real research, agents continuously run in the background scanning through interactions, identifying where PAT made mistakes, and developing human-audited benchmarks. These benchmarks lead to changes in both context repositories and the harnesses built for PAT, resulting in improvements that benefit all users, not just the individual who encountered the issue.

The team emphasized that PAT is not a prototype but a fully deployed production system. This distinction is crucial when considering the LLMOps challenges they addressed. The system needed to handle real investment decisions involving billions of dollars, requiring a level of reliability and correctness far beyond what might be acceptable for a demo or prototype system.

## Multi-Archetype Team Structure

An interesting organizational aspect is how Bridgewater structured the team building PAT. They described it as an internal applied AI startup incubated within the broader firm, with the ability to move flexibly and quickly while drawing upon the firm's resources. The team combined multiple archetypes: investors who bring context and domain-specific expertise, technologists who bring architectural capability, and scientists who bring rigor. This multi-disciplinary composition was positioned as essential for building AI systems for expert users. Additionally, having hundreds of expert users internally generates continuous signal on how tools should evolve and improve over time.

## Security and Access Control

A significant LLMOps challenge addressed was security and access control. Different investors at Bridgewater have access to different information—some can see positions across all markets while others cannot. Unlike systems where everyone interfaces with the same system prompt and tools, each person at Bridgewater has a unique version of PAT tailored to what they can and cannot see. This uniqueness is implemented through customized context and tools for each user. The requirement was that PAT needed to access all information that its specific user has access to in order to truly provide value, while strictly preventing information leakage across security boundaries.

## Data Infrastructure

PAT operates on top of substantial data infrastructure. For unstructured data, the system has access to a database containing millions of documents from around the world, including broker pieces, earnings transcripts, and internal emails. This database updates in near real-time with thousands of new documents arriving daily. For structured data, PAT searches a time series database containing tens of millions of series that Bridgewater has been modeling for 50 years, including both external data like oil prices and internally derived concepts like projected inflation rates.

The search agents use traditional techniques like RAG and re-ranking, but the team found a significant improvement by layering in human-like inspection behavior. When human researchers search for data, they don't just rely on time series names—they examine frequency, currency, and whether values align with their priors. Embedding this reasoning into the search agent improved accuracy from approximately 50% to 90%. This represents an important lesson in LLMOps: simply applying standard techniques may not be sufficient, and incorporating domain-specific human behavior patterns can yield substantial improvements.

## Two-Agent Architecture: Chat and Coding Separation

The overall architecture separates concerns into two distinct agents: a chat agent and a coding agent. This separation was a deliberate design decision based on the fact that Bridgewater investors are not programmers by trade—they care about investment content. By keeping the chat purely about investment content, coding becomes a pure implementation detail invisible to the user. This separation created several benefits: clean context where each agent becomes specialized at its job and naturally improves, and the ability to tailor the chat experience specifically for investment discussions.

The chat agent is implemented in LangGraph, primarily used for persistent state management, with out-of-the-box support for cancellations and continuations that the team previously managed themselves with inferior results. The chat agent has access to various tool calls including data series search, unstructured search, and ultimately invokes the coding agent as a tool call when ready to produce a Python-Pandas analysis.

## Investment Domain Context

The domain context provided to the chat agent is high-quality and specific to Bridgewater. The team teaches the chat agent how to talk like a Bridgewater investor, including extensive jargon, so that users and agents communicate like coworkers. Importantly, investors themselves can contribute context directly, similar to developers contributing to a codebase. The team noted that users are often better at writing context than the technical team, and maintaining low ego about this and allowing direct contributions improves the system.

Beyond general context, the chat agent receives step-by-step guides for handling certain types of analyses. This structured guidance makes the system feel more like a dependable product with established workflows rather than a nebulous collection of context. This approach represents a best practice in LLMOps: providing not just information but structured procedures helps agents deliver more consistent and reliable experiences.

## Planning Philosophy: The Plan Is the Analysis

A core technical philosophy underlying PAT is that the plan is the analysis. The team came to the view that if they could create a high-quality, detailed plan, they could confidently take that plan, intelligently execute it, and produce desired outputs. This philosophy drove substantial investment in the planning phase. While agents asking clarifying questions is standard in modern chatbots, Bridgewater focused intensely on the substance of those questions. They devoted significant time and energy to developing context and benchmarks that shaped this capability, teaching PAT what makes a good research question versus a bad one. This back-and-forth helps human investors—who tend to under-invest in planning—flesh out high-quality research plans.

The planning phase itself is relatively expensive from a time perspective, but this cost is paid deliberately because of what it enables during execution. During planning, PAT comes up with all data frames that will be produced in the analysis, defines the schemas of all those data frames, and most importantly, determines how all data frames connect to each other. This detailed planning enables the sophisticated parallel execution capabilities described below.

## Code Generation: Parallel Execution Through Detailed Planning

The analysis plan consists of tasks, with each task mapping approximately to one Python function that calculates a data frame. Each task receives a name, a description of what to calculate, and structural and semantic information about the expected output data frame. A critical design goal is that every task should deterministically compile via LLM to code—meaning two LLMs operating on the same task should produce code that, when run, is semantically equivalent with the same output values.

This deterministic compilation goal positions the analysis plan not as a simple to-do list but as a natural language Python project. Because the plan contains so much detail, code generation can apply sophisticated techniques. The plan is split into tasks and parallel LLM generation occurs across all tasks simultaneously. Because the plan is so detailed, a visualization task at the end of the plan already knows everything it needs to consume from code generation that hasn't yet completed for earlier steps like loading data.

The team compared their approach to Claude Code with impressive results: on average, for the same context and same plan, PAT is approximately four times faster at generating code. More impressively, they achieve hyper-scaling where a 20-task plan takes the same amount of time as a three-task plan due to parallelization. This represents a significant LLMOps achievement, as code generation latency is often a bottleneck in coding agent systems.

## Execution and Validation Architecture

While the natural approach might be to execute generated code naively, LLMs aren't yet perfect on Bridgewater's tasks and don't normally one-shot analyses. Instead, PAT takes the task from the plan and the generated code, runs the code, compares output to the task specification, and if incorrect, edits the code iteratively until correct. The system first performs static analysis on the code to determine the directed acyclic graph of dependencies, then applies validation agents in parallel across tasks. A five-task plan might collapse to three layers of validation, while a 20-task plan might have four or five validation layers.

A crucial architectural principle emphasized repeatedly is that correctness is enforced in the architecture itself, with no agentic orchestration involved. The validation logic is regular Python code, making guardrails hard constraints where agents cannot forget to validate—they are forced to validate. This deterministic approach yields impressive results: when running their test suite on any plan, 95% of the time the code produced is exactly the same for two different agents. This essential determinism represents a critical LLMOps best practice for production systems where reliability is paramount.

Because the agent is so reproducible, scaling and evaluation become much more dependable than vibes-based or LLM-as-judge evaluations. This addresses a significant challenge in LLMOps where subjective evaluation methods can make it difficult to measure real improvements.

## Custom Execution Layer and Caching

A notable architectural decision is that PAT runs code for the LLMs rather than having LLMs invoke code themselves via terminal. The standard approach of LLMs calling their own code has trade-offs including high latency with tool calls and agents sometimes getting lost along the way. Instead, Bridgewater uses a classical static analysis pipeline that injects caching annotations into Python code to avoid re-execution and runs code through a custom framework.

Benchmarks demonstrate clear advantages. On first execution, PAT is faster than Claude Code invoking its own code because PAT never double-loads data or double-executes intermediate results. The real win comes on subsequent executions. When making a small change like renaming the last chart in a plan, Claude Code reruns all code taking approximately the same total time, while PAT has essentially instantaneous code execution for the second round. This performance characteristic is crucial for user experience—investors can make small tweaks to analyses without the overhead of regular iteration cycles, enabling a much more interactive and exploratory workflow.

## Output Integration and Compounding

An important aspect of the system architecture is that time series outputs from PAT analyses land in the same database from which inputs were pulled. This design decision has significant implications. Any output from a PAT analysis is indistinguishable from human-uploaded series that have been produced for many years. More importantly, any output from a PAT analysis can serve as an input to a subsequent analysis. This creates an environment where humans and agents can very easily compound and leverage each other's work. This represents a mature LLMOps pattern where AI-generated artifacts are first-class citizens in the data ecosystem, not siloed outputs requiring special handling.

## Quality Control and Validation

Before presenting results to users, PAT performs self-review analogous to expecting a junior analyst to double-check work before reporting. At this stage, PAT examines computed data and produced visualizations to ensure numbers seem sensible and charts look clean. If something appears off, PAT takes a step back, diagnoses the issue, refines the analysis, and ensures satisfaction with results before returning to the user. This autonomous quality control represents another layer of reliability critical for production deployment.

The final output is an interactive report where visualizations match those produced by human investors at Bridgewater. PAT uses the same in-house charting library and leverages the same existing tech stack developed internally for decades. Users can zoom in and out of charts and even send data from the interactive report to internal charting tools for further on-the-fly modifications. This seamless integration with existing tooling reduces friction in adoption and maintains consistency with established workflows.

## Continuous Learning: Autonomous and Explicit Modes

PAT improves through two primary mechanisms. The autonomous mode, referenced earlier, involves agents reviewing completed conversations looking for ways PAT can get smarter. The explicit mode allows users to kick off the learning process within the context of an analysis if they believe something should be learned from their interaction. When a user clicks a Teach button after steering PAT toward a different approach or visualization, an agent spawns to review the conversation looking for behavioral mistakes, context gaps, or user steering that could be front-run.

Users can modify the suggested learning or submit it as-is. When submitted, an agent on the backend creates a benchmark expected to fail, demonstrating the poor behavior can be reproduced. The agent then iterates on context repositories or the harness itself until the benchmark passes. After confirming that passing this benchmark doesn't cause the rest of the test suite to fail, the team receives a Slack message with a pull request including proposed changes to PAT. The next time any human comes to PAT with a similar question, they receive the improved version out of the box. This learning mechanism represents sophisticated LLMOps practice where user feedback directly drives model and system improvement through automated workflows with human oversight.

## Compiler-Inspired Design Philosophy

The technical lead emphasized his background in compiler theory and programming language design, positioning coding agents as having similar requirement footprints to compilers: fully deterministic, fully correct, and reliable. The comparison is instructive: a compiler takes user code and compiles it to something like JavaScript, while a coding agent takes a user prompt or plan and compiles it to Python. This framing influenced many architectural decisions, applying techniques from the decades-old field of compiler design to the challenge of reliable code generation.

This compiler analogy represents an important conceptual framework for LLMOps when building production systems. Rather than treating coding agents as primarily agentic problems where flexibility and exploration are prioritized, viewing them through the lens of deterministic transformation problems can lead to more reliable production systems. The team explicitly stated they think of agentic coding as a compiler problem, not an agentic problem, and encouraged the audience to consider this perspective.

## Key Learnings and Recommendations

The presentation concluded with several key learnings. The team strongly believes in specializing agents rather than building generic, powerful agents. While generic agents make impressive demos, it's difficult to make them reliable enough for daily workflows. Instead, they take often very narrow workflows, benchmark them heavily, and hill climb those benchmarks. Agents can be compounded after the fact, but it's harder to go backward from a general agent to a specialized one.

The second major learning, emphasized throughout the technical portion, is to think of agentic coding as a compiler problem rather than an agentic problem. Compilers have decades of techniques for generating code more reliably, correctly, and deterministically. Applying these techniques to LLM-based code generation can yield substantial improvements in production reliability.

## Critical Assessment

While the presentation offers valuable insights into production LLMOps practices, several claims should be evaluated critically. The team presents impressive benchmark results showing 95% deterministic code generation and 4x speed improvements over Claude Code. However, these benchmarks appear to be internal and specific to Bridgewater's use cases and data. The extent to which these results would generalize to other domains or coding tasks is unclear.

The claim of "hours of expert research work in minutes" is compelling but not quantified with specific time savings data or comparative studies. While the system clearly provides value given its deployment to hundreds of users, the magnitude of efficiency gains for typical analyses isn't detailed. Additionally, the presentation doesn't discuss failure modes, error rates, or cases where PAT performs poorly or requires significant human intervention.

The continuous learning system, while architecturally sophisticated, raises questions about how learning is prioritized, how conflicts between different users' feedback are resolved, and what guardrails prevent harmful or incorrect learnings from propagating. The presentation doesn't address these governance challenges in detail.

The security model of providing each user with a customized version of PAT is mentioned but not explained in detail. The implementation complexity, potential for security vulnerabilities, and operational overhead of maintaining hundreds of distinct agent configurations isn't fully explored. This represents a significant LLMOps challenge that likely required substantial engineering effort beyond what was presented.

Finally, the presentation is from the team that built PAT, and naturally focuses on successes and architectural highlights. Information about development timeline, resource requirements, team size, cost considerations, and the inevitable challenges and failures encountered during development would provide a more complete picture for teams considering similar projects.

Despite these limitations in what was shared, the case study demonstrates sophisticated LLMOps practices including multi-agent architectures, parallel execution strategies, deterministic code generation approaches, custom execution environments with caching, continuous learning systems, and deep integration with existing data and tool ecosystems. The compiler-inspired design philosophy and emphasis on specialized agents with heavy benchmarking represent valuable contributions to LLMOps thinking, particularly for teams building production systems in high-stakes domains.
