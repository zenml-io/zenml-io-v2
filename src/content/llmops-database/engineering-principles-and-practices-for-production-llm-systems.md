---
title: "Engineering Principles and Practices for Production LLM Systems"
slug: "engineering-principles-and-practices-for-production-llm-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693be107f8e8fc3277768476"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:35:45.827Z"
  createdOn: "2025-12-12T09:31:51.661Z"
llmopsTags:
  - "code-generation"
  - "question-answering"
  - "summarization"
  - "chatbot"
  - "data-analysis"
  - "poc"
  - "prompt-engineering"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "few-shot"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "error-handling"
  - "evals"
  - "langchain"
  - "llama-index"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "cicd"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "cache"
  - "postgresql"
  - "anthropic"
  - "openai"
  - "meta"
  - "google-gcp"
industryTags: "tech"
company: "Langchain"
summary: "This case study captures insights from Lance Martin, ML engineer at Langchain, discussing the evolution from traditional ML to LLM-based systems and the emerging engineering discipline of building production GenAI applications. The discussion covers key challenges including the shift from model training to model orchestration, the need to continuously rearchitect systems as foundation models rapidly improve, and the critical importance of context engineering to manage token usage and prevent context degradation. Solutions explored include workflow versus agent architectures, the three-part context engineering playbook (reduce, offload, isolate), and evaluation strategies that emphasize user feedback and tracing over static benchmarks. Results demonstrate that teams like Manis have rearchitected their systems five times since March 2025, and that simpler approaches with proper observability often outperform complex architectures, with the understanding that today's solutions must be rebuilt as models improve."
link: "https://www.youtube.com/watch?v=2Muxy3wE-E0"
year: 2025
seo:
  title: "Langchain: Engineering Principles and Practices for Production LLM Systems - ZenML LLMOps Database"
  description: "This case study captures insights from Lance Martin, ML engineer at Langchain, discussing the evolution from traditional ML to LLM-based systems and the emerging engineering discipline of building production GenAI applications. The discussion covers key challenges including the shift from model training to model orchestration, the need to continuously rearchitect systems as foundation models rapidly improve, and the critical importance of context engineering to manage token usage and prevent context degradation. Solutions explored include workflow versus agent architectures, the three-part context engineering playbook (reduce, offload, isolate), and evaluation strategies that emphasize user feedback and tracing over static benchmarks. Results demonstrate that teams like Manis have rearchitected their systems five times since March 2025, and that simpler approaches with proper observability often outperform complex architectures, with the understanding that today's solutions must be rebuilt as models improve."
  canonical: "https://www.zenml.io/llmops-database/engineering-principles-and-practices-for-production-llm-systems"
  ogTitle: "Langchain: Engineering Principles and Practices for Production LLM Systems - ZenML LLMOps Database"
  ogDescription: "This case study captures insights from Lance Martin, ML engineer at Langchain, discussing the evolution from traditional ML to LLM-based systems and the emerging engineering discipline of building production GenAI applications. The discussion covers key challenges including the shift from model training to model orchestration, the need to continuously rearchitect systems as foundation models rapidly improve, and the critical importance of context engineering to manage token usage and prevent context degradation. Solutions explored include workflow versus agent architectures, the three-part context engineering playbook (reduce, offload, isolate), and evaluation strategies that emphasize user feedback and tracing over static benchmarks. Results demonstrate that teams like Manis have rearchitected their systems five times since March 2025, and that simpler approaches with proper observability often outperform complex architectures, with the understanding that today's solutions must be rebuilt as models improve."
---

## Overview

This extensive discussion features Lance Martin, a machine learning engineer at Langchain, who brings deep expertise from building production ML systems at Uber (including self-driving technology) and now developing tools at Langchain to help teams deploy AI-powered applications. The conversation represents a comprehensive exploration of LLMOps practices as they've evolved in 2025, covering the fundamental shift from training models to orchestrating them, and the emerging discipline of building reliable, scalable GenAI systems in production.

The case study is particularly valuable because it synthesizes experiences from multiple production systems including Langchain's own tools, Manis (a Singapore-based agent platform), Anthropic's Claude Code, and various internal projects. Lance provides concrete examples from his work on Open Deep Research, an open-source research agent, and discusses the practical challenges teams face when building on rapidly improving foundation models.

## The Fundamental Shift in ML/AI Landscape

Lance identifies three major shifts that have transformed how teams work with AI systems. First is **architectural consolidation**: the transformer architecture has become dominant, swallowing more specialized architectures like CNNs and RNNs through sheer expressiveness enabled by scaling laws around compute, data, and model size. Second is **democratization**: unlike the self-driving era where each organization trained its own proprietary models with in-house expertise, today a small number of foundation model providers offer models through APIs, and most organizations using AI are not training models at all. Third is the **abstraction level shift**: most practitioners now work at a higher level of abstraction, dealing with prompt engineering, context engineering, fine-tuning, and building agents rather than focusing on model architecture and training.

This democratization has created what Lance calls a "new computing primitive" that developers must learn to orchestrate effectively. The challenge has moved from "how do we train a model?" to "we have this extremely powerful object accessible through an API - what do we do with it?"

## Core LLMOps Principles That Endure

Despite the paradigm shift, Lance emphasizes that several principles from traditional ML remain essential. **Simplicity** is paramount - teams should start with the simplest possible solution rather than jumping immediately to complex agent architectures just because agents are trending. The progression should be: prompt engineering first, then workflows if needed, then agents only if the problem truly requires open-ended adaptation, and finally multi-agent systems or fine-tuning only after simpler approaches are exhausted.

**Observability and evaluation** remain critical but require new approaches for non-deterministic LLM systems. Traditional unit tests are insufficient for systems that can produce varying but equally valid outputs. Langchain has built extensive tooling through Langsmith for observability, tracing, and evaluation. The emphasis has shifted toward capturing feedback from traces, building evaluation sets iteratively from user feedback, and aggressive dog-fooding rather than relying solely on static benchmarks that quickly become saturated.

**Verification and evaluation setup** is foundational not just for quality assurance but also for potential future fine-tuning. Lance references Jason Wei's "verifier's law" which states that the ability to train an AI for a task is proportional to how easily verifiable that task is. Tasks like coding are relatively easy to verify (code compiles and runs), making them amenable to reinforcement fine-tuning. Establishing clear verification criteria in evaluations creates the foundation for more advanced techniques later.

## Workflows vs Agents: Architecture Decisions

A significant portion of the discussion clarifies the distinction between workflows and agents, following Anthropic's taxonomy. **Workflows** are systems where LLMs and tools are orchestrated through predefined code paths - you define steps A, B, C, D, and while step C might involve an LLM call, the sequence is predetermined. **Agents** are systems where an LLM dynamically directs its own processes and tool usage, maintaining control over how it accomplishes tasks. The key differentiator is **autonomy**.

Workflows excel for problems with predefined, predictable steps and requirements for consistent, repeatable behavior - examples include test suite execution, code migrations, or any task with a known sequence. Agents are better suited for tasks requiring ongoing adaptation, debugging, and iteration where the next step is conditioned on prior results. Research and coding are classic agent use cases because they're inherently open-ended.

Lance highlights examples from Shopify's internal framework called "Roast" (similar to Langchain's Langgraph) which emphasizes using workflows for well-defined problems. Importantly, workflows and agents can be composed - you can embed agents within workflow steps, allowing hybrid architectures that leverage the strengths of both approaches.

The spectrum of "agency" is also important to understand. It's not binary but a continuum from simple LLM calls with memory, to tool-enabled LLMs, to structured workflows, to agents with increasing autonomy. Higher agency systems work best with appropriate supervision - human-in-the-loop patterns become essential when agents have significant autonomy, particularly for security-sensitive operations.

## The Bitter Lesson and Continuous Rearchitecture

One of the most profound insights Lance shares relates to Rich Sutton's 2019 essay "The Bitter Lesson," which argues that general methods leveraging computation ultimately prove most effective by large margins over more complex methods with human-designed biases. This principle applies not just at the model layer but also at the application layer when building on LLMs.

The critical implication is that **applications built on exponentially improving models must be continuously rearchitected**. Lance's work on Open Deep Research demonstrates this viscerally - he started with a simple workflow in 2024 because tool calling was weak, but had to rearchitect the system three to four times over a year as models improved. Manis rearchitected their entire system five times since launching in March 2025. Boris from Claude Code mentioned in passing that Claude Code is "70% model, 30% scaffolding" and that as models improve, the scaffolding work becomes increasingly irrelevant.

This creates a unique challenge for LLMOps: you cannot build a fixed architecture and consider it done. The assumptions baked into your architecture today will be wrong in six months when substantially better models are released. Teams must embrace rapid rearchitecture as a normal part of their workflow. Fortunately, the cost of rebuilding has decreased significantly with powerful code assistants like Claude Code, Cursor, and Devon making it faster to rearchitect systems.

Lance advises testing systems across different model capacities (low, mid, state-of-the-art) to ensure that performance improves with model capability - if it doesn't, your architecture may be bottlenecking future improvements. This forward-looking evaluation approach helps identify whether your harness or system is "future-proof" in the sense that it will benefit from model improvements rather than limiting them.

## The Agent Harness and Tool Calling Evolution

The **agent harness** is the orchestration layer that manages the execution loop for agents. When you build an agent, you take an LLM SDK (OpenAI, Anthropic, etc.), bind tools to it, and the LLM produces structured outputs (tool calls) that conform to the tool schemas you've provided. The harness actually executes those tool calls, packages the results as messages, manages the growing message list, and passes it back to the LLM for the next turn.

More sophisticated harnesses handle context engineering (discussed extensively below), implement safety measures, and manage the overall agent lifecycle. Claude Code provides a visible example - users can see the bash tool calls, search operations, and other tool invocations in real-time as the agent runs. This visibility into the harness operations is part of good observability.

Tool calling has improved dramatically, with models becoming substantially better at instruction following and making appropriate tool calls. The Meter leaderboard tracks the length of tasks LLMs can accomplish, and this metric has been doubling every seven months. Models are now achieving 50% success rates on tasks that take humans approximately two hours. This improvement in tool calling reliability and the ability to handle longer-horizon tasks has made agents increasingly viable for production use.

Interestingly, the trend is toward **fewer, more atomic tools** rather than binding hundreds of specialized tools directly to the model. Manis and Claude Code both exemplify this approach: instead of binding 100+ tools and bloating the system prompt with all their instructions, they provide a small number of foundational tools like file system operations and a bash tool. The bash tool allows the agent to execute arbitrary commands, dramatically expanding its action space without increasing prompt size. For MCP (Model Context Protocol) tools, rather than binding them all to the model, Manis uses a CLI that the agent can call through the bash tool to access any MCP functionality.

## Context Engineering: The Critical Discipline

**Context engineering** has emerged as one of the most important disciplines for production LLM systems, and Lance provides exceptional detail on this topic. The fundamental problem is that naive agent implementations with tool calling in a loop quickly accumulate massive context. A research agent making multiple search calls, for instance, can easily accumulate hundreds of thousands of tokens as each search result gets appended to the message list and passed back to the LLM on every turn.

This creates three problems: cost (processing hundreds of thousands of tokens repeatedly is expensive), latency (more tokens means slower processing), and most critically, **context rot**. Chroma published research showing that as context length increases, performance degrades. Anthropic notes that the attention mechanism starts to degrade with respect to context length. Even though models like Sonnet 3.5 advertise million-token context windows, the **effective context window** - the length at which you maintain high-quality instruction following - is often much smaller than the technical limit.

The Manis CTO confirmed in a webinar with Lance that the effective context window is "quite a bit lower" than the stated technical limits, and failure modes can be subtle and non-obvious. This means teams cannot simply rely on large context windows and must actively manage context even when technically there's "room" for more tokens.

Lance outlines a **three-part playbook for context engineering**: reduce, offload, and isolate.

**Reduce** involves actively shrinking context through techniques like:
- **Compacting older tool calls**: After several turns, older tool results can be compressed or summarized rather than kept in full in the message history. Manis employs this technique.
- **Trajectory summarization**: Claude Code uses this approach - when approaching context limits, produce a summary of the entire message history and compress all those tokens into a much shorter form, then continue forward with the compressed history.

**Offload** involves moving information out of the immediate context while keeping it accessible:
- **File system storage**: Manis saves full tool results to a file system while keeping only references or compressed versions in the active message list. The full results remain accessible if needed but don't bloat every LLM call.
- **Tool simplification**: Rather than binding 100+ tools to the model (which requires describing all of them in the system prompt), use atomic tools like bash and file system operations that can accomplish diverse tasks without prompt bloat.

**Isolate** involves separating concerns through architecture:
- **Multi-agent systems for context isolation**: Token-heavy sub-tasks can be offloaded to specialized sub-agents. The sub-agent processes its context independently and returns only a summary or result to the main agent, preventing context contamination. This pattern appears across production systems including Manis, Anthropic's multi-agent researcher, and Lance's Open Deep Research.

Importantly, **prompt caching** helps with cost and latency but does not address context rot - if you're using 100,000 tokens, it's still 100,000 tokens even if cached, and the quality degradation from long context remains. Teams like Manis use caching extensively but still perform aggressive context reduction through pruning and summarization.

## Evaluation Strategies for Non-Deterministic Systems

Evaluation for LLM systems requires new thinking beyond traditional unit tests. Lance emphasizes that while large static benchmarks exist, they tend to saturate quickly as models improve. Production teams have shifted toward evaluation strategies that emphasize:

**User feedback and in-app capture**: Both Claude Code and Manis rely heavily on dog-fooding and direct user feedback captured within applications. When users encounter issues or unexpected behavior, these examples flow into evaluation sets. Langsmith provides tooling to capture feedback from traces and build evaluation sets iteratively.

**Aggressive tracing and data inspection**: Rather than relying purely on metrics, successful teams obsessively examine raw traces and actual system behavior. Setting up high-quality tracing is "table stakes" for production LLM systems. Claude Code development was driven significantly by internal dog-fooding where developers used the tool intensively and examined traces to identify issues.

**Component-level evaluation**: For complex systems, evaluating sub-components independently provides valuable signal. In a RAG system, evaluating retrieval quality separately from generation quality helps isolate issues. Lance's email agent example includes separate evaluations for the triage step, the response generation, and the tool calls. This granular approach makes debugging more tractable.

**Continuous evolution of eval sets**: Static benchmarks become less useful as models improve and saturate them. The Manis team mentioned moving away from benchmarks like Gaia because they saturate relatively quickly. Instead, continuously surfacing new failure cases from users and incorporating them into evaluation sets keeps evals relevant.

**Business metric alignment**: Ultimately, high-level business metrics must guide development. Evaluation helps ensure the metrics you care about are actually being met, even if the path to achieving them changes as you iterate.

It's worth noting that in regulated industries (financial services, healthcare, pharmacy), the ability to rely on user feedback in production may be limited, requiring more upfront evaluation infrastructure before deployment.

## Ambient/Background Agents and Memory Systems

The rise of **ambient or background agents** represents an emerging form factor enabled by improved model capabilities. These are agents that run asynchronously, often on schedules (cron jobs, continuous polling), to handle tasks without real-time user interaction.

Lance built an ambient email agent that runs every 10 minutes, pulls in emails, triages them, decides which to respond to, drafts responses, and queues them for approval. Users review and approve responses through an interface, and the system sends them. Harrison (Langchain's CEO) uses this system in production. Code examples include CodeX, which can be kicked off to work asynchronously on coding tasks.

The challenges with ambient agents revolve around trust and review burden. If an agent spins off on a long task and goes down the wrong path, you receive a large body of work that requires significant review. Designing appropriate **human-in-the-loop checkpoints** becomes critical - the email agent pings Lance when it needs to ask a question, when it's drafted a response for approval, or when it decides something should be ignored for confirmation.

**Memory systems** are particularly important for ambient agents since they handle long-horizon tasks autonomously. Ideally, they learn user preferences over time rather than repeating the same mistakes. Lance's email agent includes a simple long-term memory system stored in files that updates continuously as he provides feedback. This allows the agent to get smarter over time, which is essential for something running autonomously - it would be frustrating if the system kept making the same errors without learning.

## Model Context Protocol (MCP) and Standardization

The **Model Context Protocol (MCP)** emerged from internal needs at Anthropic, as described by John Welsh at the AI Engineer Summit. As models became good at tool calling in mid-to-late 2024, people inside Anthropic started writing numerous tools without coordination, leading to duplication, custom endpoints, inconsistent interfaces, and maintenance challenges.

MCP provides a standardized client-server protocol for connecting tools, context, and prompts to LLM applications. An MCP server exposes functionality, and client applications (Claude Code, Cursor, Claude desktop app, or custom Langgraph agents) can connect to it through the standard protocol. Lance uses an MCP server for Langraph documentation - this single server connection works across all his development tools.

The broader significance relates to the value of **standardization in larger organizations**. When many people work on AI systems, having standard tooling, protocols, and frameworks provides benefits around security, consistent documentation, onboarding, and collaboration. This partially explains the popularity of frameworks like Langchain and Langgraph - they provide a standard set of low-level tools and primitives so teams speak roughly the same language. Langgraph agents work seamlessly as MCP clients, connecting to MCP servers without friction.

## Production Systems: Specific Examples

**Open Deep Research**: Lance's open-source research agent evolved significantly over a year. It started as a simple workflow in 2024 because tool calling was weak, but improved models required rearchitecting three to four times. This project exemplifies both the bitter lesson (simpler approaches improve as models improve) and the need for continuous rearchitecture.

**Manis**: The Singapore-based general-purpose agent platform launched in March 2025 and has rearchitected five times since then. A typical Manis run involves approximately 50 tool calls, making context engineering absolutely critical. They employ context reduction through pruning older tool calls, use extensive prompt caching, implement file system storage for offloading, and utilize multi-agent architectures for context isolation. They moved away from large static benchmarks like Gaia in favor of user feedback-driven evaluation.

**Claude Code**: Anthropic's coding assistant exemplifies the "70% model, 30% harness" principle Boris mentioned. As models improve, the scaffolding becomes less relevant. Claude Code uses trajectory summarization for context management and provides visible tracing of agent operations. Development was driven by aggressive internal dog-fooding and examining traces rather than relying on static benchmarks. The system can run in "safe mode" requiring user approval for tool calls, or in what Cursor used to call "YOLO mode" with minimal intervention.

**Shopify's Roast Framework**: An internal framework for building workflows, similar to Langgraph, that emphasizes using workflows for well-defined, predictable problems like migrations and testing. Their public talks about Roast provide excellent examples of when to choose workflows over agents.

## Practical Guidance for Leaders

Lance provides clear guidance for engineering managers and CTOs navigating this space:

**Start simple and progress deliberately**: Use prompt engineering if possible. Move to workflows if you need more structure. Consider agents only for truly open-ended problems. Use multi-agent systems for context isolation when a single agent is insufficient. Only explore fine-tuning or training models after exhausting simpler approaches. Don't increase complexity arbitrarily just because sophisticated techniques are trending on Twitter.

**Build for rapid change**: Recognize that whatever you build today will need rearchitecting as models improve. Don't be afraid to rebuild - it's normal in this era and the cost is lower with code assistants. Test across model capacities to ensure your architecture won't bottleneck future improvements.

**Embrace the future**: Things that don't work today may work tomorrow. Cursor is a prime example - the product experience was unlocked specifically with Claude 3.5 Sonnet, after which "the rest is history." Don't abandon promising directions prematurely if the limitation is model capability that's clearly improving.

**Be cautious about custom training**: It's tempting to fine-tune models for your domain, but frontier models improve so rapidly that your custom training effort may become obsolete quickly. Two years ago teams fine-tuned for structured outputs; today frontier models handle structured outputs and complex nested schemas natively, making that fine-tuning effort wasted. Only invest in custom training after exhausting approaches that benefit from frontier model improvements.

**Invest in observability**: High-quality tracing is table stakes. Tools like Langsmith provide the visibility necessary to understand what's happening in non-deterministic systems. Aggressive dog-fooding, looking at raw data, and examining traces often provides more value than sophisticated evaluation metrics alone.

This comprehensive case study reveals that LLMOps in 2025 is fundamentally about building systems that can evolve rapidly alongside foundation models, managing context carefully to prevent degradation, choosing appropriate architectures for each problem's level of open-endedness, and establishing observability and evaluation practices suited for non-deterministic systems. The discipline is maturing quickly, with clear patterns emerging around context engineering, workflow versus agent architectures, and evaluation strategies that emphasize user feedback and continuous iteration over static benchmarks.