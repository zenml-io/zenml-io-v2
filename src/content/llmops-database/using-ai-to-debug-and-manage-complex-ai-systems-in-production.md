---
title: "Using AI to Debug and Manage Complex AI Systems in Production"
slug: "using-ai-to-debug-and-manage-complex-ai-systems-in-production"
draft: false
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "poc"
  - "prompt-engineering"
  - "evals"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "crewai"
  - "fastapi"
  - "documentation"
  - "open-source"
  - "anthropic"
industryTags: "tech"
company: "Incident"
summary: "Incident builds an incident response management platform that aims to automate production investigations using AI. As their AI systems grew to involve hundreds of prompts, agents, and tools working together, traditional debugging approaches became intractable for humans. They solved this by building AI-powered internal tooling: creating CLI tools to help coding agents work with eval datasets, translating their debugging UIs into downloadable file systems that coding agents can navigate, and developing structured analysis pipelines using AI agents to systematically evaluate performance across thousands of investigations. This approach enabled them to maintain and improve highly complex AI systems that would otherwise be impossible to debug and optimize at scale."
link: "https://www.youtube.com/watch?v=L2r6vLlLgs8"
year: 2026
seo:
  title: "Incident: Using AI to Debug and Manage Complex AI Systems in Production - ZenML LLMOps Database"
  description: "Incident builds an incident response management platform that aims to automate production investigations using AI. As their AI systems grew to involve hundreds of prompts, agents, and tools working together, traditional debugging approaches became intractable for humans. They solved this by building AI-powered internal tooling: creating CLI tools to help coding agents work with eval datasets, translating their debugging UIs into downloadable file systems that coding agents can navigate, and developing structured analysis pipelines using AI agents to systematically evaluate performance across thousands of investigations. This approach enabled them to maintain and improve highly complex AI systems that would otherwise be impossible to debug and optimize at scale."
  canonical: "https://www.zenml.io/llmops-database/using-ai-to-debug-and-manage-complex-ai-systems-in-production"
  ogTitle: "Incident: Using AI to Debug and Manage Complex AI Systems in Production - ZenML LLMOps Database"
  ogDescription: "Incident builds an incident response management platform that aims to automate production investigations using AI. As their AI systems grew to involve hundreds of prompts, agents, and tools working together, traditional debugging approaches became intractable for humans. They solved this by building AI-powered internal tooling: creating CLI tools to help coding agents work with eval datasets, translating their debugging UIs into downloadable file systems that coding agents can navigate, and developing structured analysis pipelines using AI agents to systematically evaluate performance across thousands of investigations. This approach enabled them to maintain and improve highly complex AI systems that would otherwise be impossible to debug and optimize at scale."
notion:
  pageId: "363f8dff-2538-80d4-98b3-cb1dc9a9745d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-17T19:01:00.000Z"
  lastEditedTime: "2026-05-17T19:01:00.000Z"
  publishedAt: "2026-05-19T13:35:46Z"
---

## Overview

Incident operates an incident response management platform used by companies like Netflix, Etsy, and Skyscanner. The company's ambitious goal extends beyond simply managing incidents to fully automating production investigations. When something goes wrong in production, their AI system automatically runs comprehensive investigations that query hundreds of telemetry sources including logs, metrics, traces, and historical incident data, cross-referencing this information with customer codebases to identify root causes and suggest fixes. The speaker, Laurence, a founding engineer at Incident, has been building these AI capabilities for approximately 18-24 months.

The central challenge that Incident faced is one that will resonate with many organizations deploying complex AI systems: as their AI capabilities became more sophisticated, the systems themselves became too complex for humans to effectively debug and optimize without assistance. Their production AI systems now involve not just a single prompt, but intricate hierarchies of dozens of agents, hundreds of prompts, and thousands of tool calls working together. This complexity created a fundamental scalability problem in their LLMOps practice.

## The Core Problem: Complexity Beyond Human Tractability

The investigations that Incident produces are impressive in scope but correspondingly difficult to evaluate. A single investigation might run hundreds of telemetry queries and produce detailed root cause analyses with remediation suggestions. However, determining whether such an investigation is "good" or "bad" requires deep understanding of the incident context, often taking an hour or more of human analysis to review the incident details, postmortem documentation, and cross-reference this against what the AI system produced.

This evaluation challenge is compounded by scale. Incident runs these investigations across hundreds of customer accounts daily, each with unique infrastructure and failure patterns. Behind each investigation are hundreds or thousands of individual prompts, and the system architecture includes at least 10 different agents with 50 or more components in the hierarchy powering interactions. The speaker notes that their system diagram couldn't even fit on the screen during the presentation, illustrating the scale of complexity involved.

## Solution Part 1: Making Evals Agent-Friendly

Incident treats evals as AI unit tests. Each eval consists of a prompt, input data, execution, and grading criteria that determines pass/fail status. They store evals in YAML files alongside their Go code, as the company builds everything in Go including their AI systems. The grading criteria themselves are defined using AI to assess whether outputs meet specified requirements.

However, they encountered significant problems with traditional eval approaches. Production evals that captured realistic failure scenarios often included nearly entire incident contexts, resulting in multi-megabyte YAML files that were extremely difficult to maintain. While they created functionality to easily capture problematic production interactions as evals, these weren't ideal test cases. Good unit tests should be focused and understandable, not massive dumps of production data.

Critically, as these YAML files grew large, coding agents couldn't work with them effectively. Loading these files into context would hit context limits, preventing agents from modifying or enhancing the eval suite. This created a bottleneck in their development workflow.

Their solution was to build a small CLI tool called "eval tool" designed specifically to enable agents to leverage their eval suite files. This CLI provides simple commands to list test cases, edit them, replace them, or add new ones. By creating this agent-friendly interface, they enabled coding agents to work effectively with their evaluation infrastructure.

They took this further by creating runbooks or skills for coding agents that codify the entire eval modification workflow. When a developer identifies a problem, they can instruct a coding agent to examine a prompt and specify desired behavior. The agent then creates an eval case proving the failure exists, modifies the prompt to pass the eval, verifies that no other evals in the suite were broken by the change, and even attempts to consolidate and simplify the prompt to prevent it from becoming unwieldy over repeated modifications.

The speaker demonstrates this working in practice with Claude Code, showing the agent adding a new eval for translating human queries into Loki log query syntax, checking that it passes with acceptable repeatability, and confirming the change is ready to proceed. This automation proved effective for scenarios where developers know which specific prompt needs modification.

## Solution Part 2: File System Downloads for Debugging

Knowing which prompt to modify remains a challenge when dealing with systems involving dozens of agents and hundreds of prompts. The speaker illustrates this by showing their chatbot's architecture graph, which includes at least 10 agents and far more components than could fit on screen. Even when receiving a problematic customer interaction, pinpointing which part of the system hierarchy caused the issue is non-trivial.

This problem intensifies for their investigation system, where each investigation involves numerous steps, with each step potentially expanding into hundreds of prompts and tool calls. Making a subtle error anywhere in this pipeline can result in completely incorrect root cause analysis, but tracing through the system to find where the error originated is extremely difficult.

Incident built UI tools to help humans inspect these complex traces, but these UIs have fundamental limitations. Humans lack sufficient time to thoroughly analyze the volume of interactions the system generates, and agents cannot effectively use web UIs to perform systematic analysis.

Inspired by Anthropic's discovery with Claude Code that these agents excel at navigating and analyzing file systems using standard tools, Incident implemented the ability to download all UI content as structured file systems. For any AI system interaction, they can export the complete context including all prompts, inputs, outputs, and trace information as a file system that can be dropped into a sandboxed Claude Code session.

This approach has several advantages. The file systems are self-documenting, allowing coding agents to understand the structure naturally. Developers can point the agent at a problematic interaction and ask it to identify what went wrong. Because the code base is also available in the session, the agent can trace through the system hierarchy and identify exactly which component needs modification. From there, developers can leverage the eval red-green cycle described earlier to make and validate changes.

The speaker emphasizes that there are few limits to what can be represented in ASCII. Complex traces that would be presented visually in UIs translate effectively to text files that LLMs can consume and analyze. This has transformed their debugging workflow: problematic interactions are downloaded into sandboxed Claude Code sessions, the agent analyzes what went wrong, identifies which system component should change, and can even make that change with verification through the eval runbook, all within a single session.

## Solution Part 3: Automated Analysis Pipelines

While the file system approach works well for individual debugging sessions, Incident needed to understand performance at scale. They run thousands of investigations daily across hundreds of customer accounts through what they call "back tests," which are essentially batches of investigations executed to track system performance over time.

These back tests produce high-level metrics like "86% accurate RCA on our account," but such aggregate numbers provide limited insight into why performance improved or degraded, or how to improve the system for specific customers. Understanding the underlying patterns requires deeper analysis than humans can practically perform given the volume.

Incident's solution was to enable downloading all investigations from a back test into a file system, then feeding this into analysis pipelines run by coding agents using structured markdown playbooks. These playbooks codify exactly how agents should process the downloaded information, understand investigations, and conduct systematic analysis.

They created a repository called Scrapbook that implements this structured analytical flow. Key architectural decisions make these pipelines effective. First, they parallelize analysis by starting approximately 25 agents simultaneously, each building independent analysis of individual investigations. This parallel processing dramatically accelerates analysis of large batches.

Second, after individual analysis completes, the pipeline performs cohort clustering to identify patterns across investigations, grouping similar failure types and analyzing meta-level questions about why the AI system performs well or poorly on specific customer accounts. This clustering yields actionable insights beyond simple pass/fail metrics.

Third, all analysis is stored incrementally in files within the downloaded file system, enabling the pipeline to start and resume if interrupted. This persistence is crucial for long-running analyses.

Fourth, the analysis combines system traces with the actual code base powering the system. When problems are identified, agents can examine the code and propose specific fixes, pointing to exact locations requiring modification. Because everything is loaded in the coding session, developers can immediately ask the coding agent to implement the suggested fix and validate it through the eval process.

The speaker shares an example where a back test revealed investigations going wrong. Through this analysis pipeline, they identified the specific problem, discussed potential feature changes with coding agents, generated a pull request with the fix, and deployed it to production for validation. This demonstrates the complete loop from automated problem detection through resolution.

## Key Insights and Generalization

The speaker emphasizes that these patterns generalize well beyond Incident's specific use case. Organizations building complex AI systems need to apply AI just as effectively to their internal debugging and management tooling as they do to their customer-facing products. When AI systems become too complex for traditional debugging approaches, AI-powered internal tooling becomes not just helpful but necessary.

Several specific recommendations emerge from Incident's experience. First, prioritize making debugging tools work excellently with coding agents. If internal tooling cannot be effectively used by agents, it creates bottlenecks in development and debugging workflows.

Second, file systems provide exceptionally good context for agents. While alternatives like Model Context Protocol or human-use agents might seem attractive, Incident found that bulk downloading information into file systems that coding agents can grep through and navigate with standard tools proved far more effective.

Third, whenever complex analysis is required, consider creating AI runbooks instead of expecting humans to perform the analysis manually. The speaker claims this saves literally days or weeks of engineering time.

## Critical Assessment

This case study presents a compelling approach to managing LLM complexity in production, but several considerations warrant examination. The solutions described are meta-level applications of AI to manage AI systems, which introduces recursive complexity. While Incident reports success with this approach, organizations adopting similar patterns need to consider whether their AI debugging tools could themselves require debugging, potentially creating additional layers of complexity.

The heavy reliance on coding agents like Claude Code represents both a strength and a dependency risk. The effectiveness of this entire approach depends on the continued availability and capability of these agents. Organizations considering similar architectures should assess vendor lock-in risks and consider whether these patterns remain viable if specific coding agent capabilities change.

The eval-driven development approach described is thorough but potentially expensive. Running numerous evals with AI-based grading criteria, then having agents iterate on prompts while checking for regressions, involves substantial LLM API calls. The cost structure at scale deserves consideration, particularly for organizations with tighter budget constraints than a well-funded startup.

The file system download approach is innovative and apparently effective, but maintaining synchronization between UI representations and file system exports could create maintenance burden. As the system evolves, ensuring that file system exports remain complete and accurately reflect all relevant debugging information requires ongoing engineering attention.

Despite these considerations, the case study demonstrates sophisticated LLMOps practices addressing real scalability challenges in production AI systems. The progression from manual debugging to agent-assisted debugging to fully automated analysis pipelines represents a maturity curve that many organizations deploying complex AI systems will likely need to follow. The specific technical choices around CLI tools for evals, file system exports, and structured analysis pipelines provide concrete patterns that others can adapt to their contexts.
