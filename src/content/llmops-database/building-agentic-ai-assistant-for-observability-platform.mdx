---
title: "Building Agentic AI Assistant for Observability Platform"
slug: "building-agentic-ai-assistant-for-observability-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "698add0e9ef05131dff7f33c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-10T11:06:51.158Z"
  lastUpdated: "2026-02-10T07:51:26.559Z"
  createdOn: "2026-02-10T07:23:58.566Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "code-generation"
  - "data-analysis"
  - "question-answering"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "few-shot"
  - "evals"
  - "token-optimization"
  - "latency-optimization"
  - "langchain"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "cicd"
  - "open-source"
  - "documentation"
  - "postgresql"
  - "fastapi"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Grafana"
summary: "Grafana Labs developed an agentic AI assistant integrated into their observability platform to help users query data, create dashboards, troubleshoot issues, and learn the platform. The team started with a hackathon project that ran entirely in the browser, iterating rapidly from a proof-of-concept to a production system. The assistant uses Claude as the primary LLM, implements tool calling with extensive context about Grafana's features, and employs multiple techniques including tool overloading, error feedback loops, and natural language tool responses. The solution enables users to investigate incidents, generate queries across multiple data sources, and modify visualizations through conversational interfaces while maintaining transparency by showing all intermediate steps and data to keep humans in the loop."
link: "https://www.youtube.com/watch?v=TGWVqBAeIzI"
year: 2026
---

## Overview

Grafana Labs built an agentic AI assistant deeply integrated into their observability and monitoring platform. The assistant, which they describe as fundamentally being "a lot of for loops and a UI," helps users navigate the complex Grafana ecosystem, create dashboards, query multiple data sources, troubleshoot incidents, and learn observability best practices. The project demonstrates a pragmatic, iterative approach to building production LLM applications, with particular emphasis on rapid prototyping, maintaining human oversight, and careful context management.

The development team's journey offers valuable insights into the practical challenges of deploying agentic systems in production environments, including dealing with context window constraints, managing tool proliferation, implementing effective evaluation strategies, and balancing the tradeoffs between sophisticated multi-agent architectures and simpler, more maintainable single-agent systems.

## Initial Development and Architecture Decisions

The assistant originated from a hackathon project where the team had approximately one week to build a working prototype. This tight timeline drove several critical architectural decisions that proved beneficial in the long run. The team made the deliberate choice to build the entire agent system in the browser, with the agent logic and all tool calling happening client-side. This was described as keeping it "dead simple" and essentially using the LLM as the backend.

This frontend-first approach allowed for extremely rapid iteration without requiring backend infrastructure changes. The team acknowledges that the initial hackathon version even had the API key embedded in the frontend code, though this was purely for local development and never shipped to users. This willingness to "burn bridges to just go fast" and prove concepts before investing in production-quality infrastructure represents an important philosophy when working in the rapidly evolving LLM space.

The browser-based architecture has proven remarkably effective for their use case. Since the assistant needs to be contextually aware of what the user is viewing in Grafana, having it run in the same environment where users interact with dashboards and data sources provides natural access to relevant context. The assistant appears as a sidebar that follows users throughout the Grafana interface, always available with awareness of the current page and context.

## Model Selection and Framework Decisions

The team primarily uses Claude (specifically mentioned are versions 3.5 and 3.7) as their LLM provider. An interesting observation they made is that prompts became coupled to specific model versions—prompts optimized for Claude 3.5 didn't perform as well when they tested Claude 3.7. This coupling between prompts and model versions is an important consideration for production systems, as it means model upgrades can't be treated as simple drop-in replacements.

They also note that different providers require different prompt engineering approaches, with subtle differences in optimal system prompts between providers like Gemini and Claude. Their advice is to specialize prompts for specific models rather than trying to maintain provider-agnostic prompts, as the quality gains from optimization are significant.

Initially, the team experimented with LangChain (specifically the TypeScript version for browser use). They found it helpful for understanding the space initially—it provided useful type definitions and a rough structure for their APIs—but ultimately removed it from their codebase. The main reasons were encountering limitations and realizing they weren't gaining much value from the framework relative to its constraints. For their specific needs with a talented engineering team, they found having direct control over the implementation more valuable than the abstractions LangChain provided. However, they acknowledge that for side projects or teams without as much engineering capacity, frameworks like LangChain could still be valuable for avoiding reinventing foundational components.

This decision reflects a broader pattern in their development approach: start with tools that help you learn and move quickly, but be prepared to replace them with custom implementations when you need more control or when the abstractions prove limiting.

## Context Window Management and Tool Design

One of the most significant challenges the team faces is managing the context window. Their system prompt alone consumes approximately 20,000 tokens, with tools consuming another 20,000 tokens, totaling around 40,000 tokens before any user conversation begins. This is substantial and represents a significant portion of available context in most models.

Grafana's comprehensive feature set—including dashboards, multiple data sources, alerting, incident response management, and numerous other capabilities—creates pressure to expose many tools to the assistant. However, the team discovered that having too many tools causes confusion for the LLM, similar to how humans struggle in conversations with too many participants. The agent struggles to select the right tool or understand how to use tools effectively when presented with thousands of options.

To address this, they developed a technique they call "tool overloading." This involves combining multiple related operations into a single tool with an "operation" or "action" parameter that specifies which specific sub-operation to perform. For example, instead of having separate tools for "start investigation," "update investigation," and "summarize investigation," they created a single "manage investigation" tool with an action parameter that can be set to "start," "update," or "summarize."

The team views tool overloading as somewhat of a hack—it creates complications with parameter schemas since different operations may require different parameters, some optional for one operation but required for another. They acknowledge this isn't ideal and that the schemas weren't really designed for this pattern. However, it provides immediate practical value by reducing the number of distinct tools the agent sees, which helps it navigate the decision space more effectively.

Their long-term vision involves moving toward a more sophisticated routing system where the initial agent analyzes the user's intent and routes to specialized sub-agents with relevant tool subsets. This multi-agent architecture would provide better tool organization and reduce context requirements for each individual agent. However, they're cautious about implementing this too early, noting that multi-agent systems introduce significant complexity around context passing, coordination, and maintaining consistent voice across agents.

The team recommends starting with many tools to observe how the LLM uses them, learning from this experimentation, then potentially narrowing down to specific workflows that work well. This empirical approach—build, observe, learn, refine—is more effective than trying to design the optimal tool set upfront.

## Tool Response Design and Error Handling

An important discovery was that tools should return natural language rather than structured data formats like JSON or XML. Despite initial intuitions that structured formats would be clearer, they found that returning plain natural language descriptions of results works better because they're using a large language model—it's fundamentally designed to work with language.

Error handling represents another crucial aspect of their tool design. Initially, they sometimes swallowed errors or didn't pass them back to the LLM. They learned that propagating error messages directly to the agent significantly improves its ability to self-correct. For example, if the agent generates a query with a syntax error, receiving the specific error message allows it to identify the mistake and fix it, much like a human developer would. This creates an effective feedback loop where the agent can iterate toward correct solutions.

The team emphasizes this mirrors how developers work with AI coding assistants like Cursor, where the assistant might make a change that produces a linting error, then immediately iterates to fix the error. This iterative, error-correcting behavior is natural for LLMs and should be embraced rather than avoided.

## Data Analysis and Visualization

When displaying query results in the assistant, they face the challenge of having the LLM understand and summarize time-series data and other observability metrics. Their approach involves sending a text representation of graphs and data to the model. For time-series data, they serialize the series with reduced resolution—perhaps 20 points instead of the full 200—using averaged values to stay within token limits while preserving the overall shape and patterns.

Interestingly, they initially tried using smaller models for this data analysis task but found they performed poorly with numerical data, frequently missing important details. They switched back to their standard model (Claude) for better accuracy with numbers, highlighting that not all tasks are suitable for smaller, faster models.

They also experimented with other approaches for understanding data patterns, including giving the agent tools to query data frames directly (asking questions like "which series has the highest peak?") and considering incorporating traditional machine learning techniques for pattern detection. This combination of LLM-based analysis with more deterministic computational tools represents a pragmatic hybrid approach.

The responses from data analysis are returned in natural language—the model describes what it sees in the data, identifies drops or spikes, or notes that data is stable and unchanging. This natural language output integrates cleanly into the conversational flow and provides context that the agent can use in subsequent reasoning steps.

## Evaluation and Testing Strategy

The team didn't implement evaluation from the beginning but added it as the system grew more complex. They found that making changes to the system prompt or adding new tools could inadvertently break existing workflows. What works well for one engineer's use case might disrupt another user's workflow.

Their evaluation strategy mirrors traditional software testing practices with both "integration tests" and "unit tests." Integration-level evaluations test the entire agent loop end-to-end, ensuring complete workflows function correctly. These are slower to run but validate that the system works as a whole. Unit-level evaluations test smaller pieces, like validating system prompts with specific inputs and checking outputs, allowing for faster iteration on specific components.

This tiered evaluation approach balances thoroughness with iteration speed—comprehensive end-to-end tests catch major regressions while focused unit tests enable rapid refinement of specific prompts or tools.

An intriguing technique they employ is "LLM as judge," where they use an LLM to evaluate conversations. Given a conversation history, they ask the model whether it successfully answered the user's query. The team reports this works surprisingly well—the model can effectively evaluate its own performance by analyzing whether it followed through on the user's request, whether the steps taken were logical, and whether the conclusion addressed the original question.

They're interested in expanding this self-evaluation capability, potentially having the LLM suggest improvements to prompts or even to the system itself based on its analysis of successful and unsuccessful interactions.

## User Feedback and Learning Loops

The assistant includes multiple feedback mechanisms. At the conversation level, users can provide general feedback about the entire interaction. Additionally, individual messages and tool executions have thumbs up/down buttons, allowing users to provide granular feedback about specific assistant actions.

Critically, this feedback data is actively used rather than simply collected and ignored. A dedicated data analyst on the team builds dashboards analyzing feedback patterns, identifying which tools perform well or poorly, tracking overall satisfaction trends, and pinpointing areas needing improvement. This creates a genuine feedback loop between user experience and development priorities.

The team also emphasizes that showing the assistant's working—displaying all tool calls, queries, and intermediate results—serves multiple purposes beyond transparency. It helps users learn observability best practices by observing how the assistant approaches problems. It also implicitly teaches users how to write better prompts by demonstrating what information and context the assistant finds useful.

## Transparency and Human-in-the-Loop Design

A core design principle is keeping humans in the loop by showing all work performed by the assistant. Unlike some AI systems that just show "thinking..." and then present final results, the Grafana assistant displays every tool call, every query executed, and every piece of data retrieved. Users can expand tool executions to see full inputs and outputs.

This transparency serves several critical functions. First, it builds trust—users can verify that the assistant is actually querying the right data sources and reasoning from real data rather than hallucinating. This is especially important during incidents where users are stressed and need confidence in the information they're receiving.

Second, showing intermediate results as visualizations rather than just text makes the data more accessible and interpretable. Since Grafana specializes in data visualization, they leverage their visualization capabilities within the chat interface, displaying time-series graphs, logs, and metrics visually. This is more effective than walls of text and aligns with how users normally interact with observability data.

Third, transparency enables learning. Users who are new to Grafana, coming from other systems, or still learning observability concepts can observe how an expert system approaches problems. They can see what queries the assistant writes, what data sources it checks, and what patterns it looks for.

The team explicitly contrasts this with other agentic applications that hide the work and only show final outputs. While that might feel more magical, it's inappropriate for use cases like incident response where users need to understand and verify the reasoning chain.

## Prompt Engineering and System Prompts

The system prompt encodes not just instructions for how to use tools but also observability best practices—how to approach telemetry problems, what to look for first, how to investigate different types of issues. This means using the assistant also teaches users good practices through its demonstrated behavior.

They've encountered interesting and sometimes humorous emergent behaviors during prompt development. At one point, someone accidentally deleted the entire system prompt, and the assistant actually performed better in some cases because the tool descriptions alone provided sufficient context. In another instance, a system prompt that had the assistant "talk like a dog" somehow produced better results than their carefully crafted professional prompt.

These anecdotes highlight the somewhat mysterious and empirical nature of prompt engineering—what works isn't always what you'd expect, and extensive testing and iteration are necessary. The team emphasizes that there's no substitute for actually building and trying things rather than just reading about best practices.

They note that prompts are tightly coupled to specific models, so switching models often requires re-engineering prompts. This coupling extends even to version updates of the same model, as they discovered when Claude 3.7 didn't perform as well with prompts optimized for Claude 3.5.

## Context Management for Users

The assistant's context includes not just the conversation history but also the current page context within Grafana. When users open the assistant from different pages, it automatically includes relevant context about what they're viewing—the current dashboard, data source, time range, or other page-specific information.

This contextual awareness reduces the burden on users to provide all necessary details upfront. The assistant assumes initial questions relate to what the user is currently viewing, only broadening scope if it determines the question isn't related to the current context.

However, conversations can become unwieldy as context accumulates. The team recommends starting fresh conversations when changing topics or even when continuing with the same topic after extended interactions. This practice prevents the context window from filling with irrelevant historical information that might confuse the agent.

Some tools like Cursor implement automatic summarization of older parts of conversations, creating the illusion of unbounded conversation while actually managing context behind the scenes. The Grafana team hasn't implemented this yet but acknowledges it as a useful pattern.

They also note that educating users about context management is important. Many users don't realize that starting a new chat when switching tasks produces better results. Building this understanding—that the assistant has limitations around context and memory—is part of helping users get the most value from the system.

## Multi-Agent Backend Systems

While the browser-based assistant is single-agent (though it uses multiple LLM calls for specific tasks), the team is also developing multi-agent backend systems for different use cases. These backend investigations run asynchronously without requiring a user to have Grafana open in their browser.

The backend system can be triggered by alerts or incidents and automatically investigates issues by spawning multiple specialized agents that work in parallel. For example, one agent might investigate network issues while another examines resource utilization. Because they run concurrently, investigations complete faster than sequential tool execution.

This backend architecture addresses different requirements than the interactive assistant. Users aren't watching in real-time, so the interaction model is different—investigations run autonomously and provide summaries when complete. The system can also integrate with Slack, mobile apps, or other interfaces where users aren't directly in Grafana.

However, the team is cautious about multi-agent complexity. They note that many theoretical multi-agent architectures described in blog posts and papers may not have been actually implemented and tested in production. Building truly effective multi-agent systems is difficult due to challenges in context passing between agents, maintaining consistent voice and behavior, managing the "telephone game" effect where information degrades as it passes through multiple agents, and dealing with coordination complexity.

Their approach is pragmatic: they acknowledge multi-agent systems have compelling use cases (parallelism, specialization, asynchronous operation) but only implement them where there's clear value, and they're thoughtful about the added complexity. They prefer starting simple and adding complexity only when justified by concrete requirements.

## Leveraging Open Source and Community

An interesting advantage Grafana has is that their platform is open source, as are many of the projects in the observability ecosystem (Prometheus, Loki, etc.). This means enormous amounts of documentation, examples, dashboards, and community-contributed content exist in public repositories and forums—all of which was likely included in the training data for models like Claude.

As a result, the LLMs have surprisingly good intuitive understanding of how to use Grafana, write Prometheus queries, construct Loki queries, and approach observability problems. The model essentially learned from the entire community's collective knowledge.

The team contrasts this with proprietary or closed-source platforms, where LLMs have much less training data to work with and therefore less intuitive understanding. Organizations using such platforms may need to rely more heavily on retrieval-augmented generation or other techniques to provide necessary context.

This illustrates a perhaps underappreciated benefit of building on open-source technologies: your AI systems inherit knowledge from the broader community's contributions and documentation.

## Extensibility and Integration

Beyond the core assistant, the team has built extensibility mechanisms that allow different parts of Grafana to integrate with the assistant. Teams responsible for specific Grafana features can add buttons or entry points that launch the assistant with relevant context pre-loaded.

For example, clicking an assistant button from a specific dashboard might pass structured information about that dashboard, its panels, its data sources, and current time ranges directly into the assistant. This allows users to immediately start asking questions about what they're viewing without manually providing context.

The assistant also supports Model Context Protocol servers, allowing integration with external tools and services. Users can connect their GitHub repositories and ask questions like "what changed recently that might have caused this spike?"—the assistant can query GitHub APIs through MCP to correlate code deployments with observability data.

This extensibility philosophy—providing clean APIs and integration points that allow different teams and tools to enhance the assistant's capabilities—is crucial for scaling the system across a large, feature-rich platform like Grafana.

## Practical Advice and Lessons Learned

Throughout the discussion, the team emphasizes several key lessons for others building production LLM systems:

**Start small and iterate:** Build the smallest possible proof-of-concept first, even if you know it's not the final architecture. Don't try to design the perfect system upfront in this rapidly evolving space.

**Be willing to make expedient choices:** The team deliberately made choices they knew weren't production-ready (API keys in frontend code, running entirely in browser) to prove concepts quickly. Once validated, they refactored for production requirements.

**Don't over-abstract too early:** They removed LangChain because they didn't need the abstraction and wanted more control. Frameworks can be useful for learning but may become constraints.

**Experimentation is essential:** There's no substitute for building and trying things. Read about best practices but validate them in your specific context.

**Prepare for change:** Model capabilities are improving rapidly and prices are dropping. Don't over-invest in elaborate workarounds for current limitations that may not exist in six months.

**Balance tool quantity carefully:** Too many tools confuse the agent; too few limit capabilities. Start with more tools to observe behavior, then potentially consolidate into workflows.

**Show your work:** For applications where trust and verifiability matter, transparency about the agent's reasoning and actions is crucial.

**Actively use feedback:** Collect user feedback but more importantly, analyze it and act on it. Build dashboards, identify patterns, prioritize improvements.

**Educate users:** Help users understand how to work effectively with AI systems—how to provide good prompts, when to start fresh conversations, how to interpret results.

**Consider the pace of progress:** Model improvements may solve your current problems faster than elaborate engineering solutions. Balance investing in optimization versus waiting for better models.

The Grafana team's experience demonstrates that building production LLM applications requires balancing many concerns: rapid iteration versus robust architecture, simplicity versus capability, transparency versus magic, optimization versus waiting for better models. Their pragmatic, empirically-driven approach—building quickly, learning from real usage, and refining continuously—offers a valuable model for others deploying LLM systems in production.