---
title: "Building Production-Ready LLM Agents with State Management and Workflow Engineering"
slug: "building-production-ready-llm-agents-with-state-management-and-workflow-engineering"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed40359a5619ddd67df"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:40:54.336Z"
  createdOn: "2024-11-21T14:08:20.520Z"
llmopsTags:
  - "devops"
  - "documentation"
  - "guardrails"
  - "monitoring"
  - "multi-agent-systems"
  - "multi-modality"
  - "openai"
  - "orchestration"
  - "poc"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "scaling"
  - "system-prompts"
industryTags: "tech"
company: "Renovai"
summary: "A comprehensive technical presentation on building production-grade LLM agents, covering the evolution from basic agents to complex multi-agent systems. The case study explores implementing state management for maintaining conversation context, workflow engineering patterns for production deployment, and advanced techniques including multimodal agents using GPT-4V for web navigation. The solution demonstrates practical approaches to building reliable, maintainable agent systems with proper tracing and debugging capabilities."
link: "https://www.youtube.com/watch?v=l6iilu9d2GU&t=951s"
year: 2023
seo:
  title: "Renovai: Building Production-Ready LLM Agents with State Management and Workflow Engineering - ZenML LLMOps Database"
  description: "A comprehensive technical presentation on building production-grade LLM agents, covering the evolution from basic agents to complex multi-agent systems. The case study explores implementing state management for maintaining conversation context, workflow engineering patterns for production deployment, and advanced techniques including multimodal agents using GPT-4V for web navigation. The solution demonstrates practical approaches to building reliable, maintainable agent systems with proper tracing and debugging capabilities."
  canonical: "https://www.zenml.io/llmops-database/building-production-ready-llm-agents-with-state-management-and-workflow-engineering"
  ogTitle: "Renovai: Building Production-Ready LLM Agents with State Management and Workflow Engineering - ZenML LLMOps Database"
  ogDescription: "A comprehensive technical presentation on building production-grade LLM agents, covering the evolution from basic agents to complex multi-agent systems. The case study explores implementing state management for maintaining conversation context, workflow engineering patterns for production deployment, and advanced techniques including multimodal agents using GPT-4V for web navigation. The solution demonstrates practical approaches to building reliable, maintainable agent systems with proper tracing and debugging capabilities."
---

## Overview

This case study is based on a technical meetup presentation by Gal Peretz, who serves as VP R&D at Renovai and is also the founder and co-host of the Lang Talks podcast (described as one of the most successful generative AI podcasts). Gal brings extensive hands-on experience building agents in production environments, having previously worked at companies like Microsoft and IBM before transitioning to NLP research and eventually starting his own LLM consulting company called Apriori.

The session provides a comprehensive walkthrough of building production-ready LLM agents, progressing from basic "hello world" implementations to sophisticated multi-agent systems with state management and workflow orchestration. The presentation is notable for its practical, code-first approach with all examples available on GitHub for hands-on experimentation.

## Understanding the Agent Architecture

The presentation begins by establishing the fundamental distinction between standalone LLMs and LLM-based agents. A standalone LLM interaction involves the user asking a question and the model responding based solely on its training data—which inevitably leads to hallucination when information is missing or outdated. In contrast, an LLM-based agent introduces autonomy: the LLM can decide whether to use external tools to fill knowledge gaps before responding.

The core architecture consists of two main components: the Agent (which makes decisions about what actions to take) and the Agent Executor (which actually executes those actions). This separation of concerns is crucial—the agent's role is purely to decide what tool to invoke and with what parameters, while the executor handles the actual function calls and returns results to the agent for further processing.

The initial demonstration uses a simple word-counting task to illustrate why agents are necessary. When asked to count words in a sentence, a vanilla LLM fails due to how it tokenizes text—it returned an incorrect count. By providing the agent with a word-counting tool, the system can delegate this task to reliable code execution rather than relying on the LLM's imprecise internal representations.

## Agent Strategy Selection

A significant portion of the presentation covers the two primary strategies for enabling agents to interact with tools:

**Prompt-Based Strategy (React)**: This approach uses prompt engineering to guide the LLM through a thought-action-observation loop. The LLM is explicitly instructed via examples to pause, consider whether tool use is needed, execute tools, and observe outputs before proceeding. This requires careful prompt construction but works with any capable LLM.

**OpenAI Function Calling**: This strategy leverages fine-tuned models that have been specifically trained to understand when function execution is appropriate and how to format function call requests. This approach requires less prompt engineering since the capability is baked into the model weights. The presenter notes this is currently the more popular approach in production, likely due to its reliability and reduced prompt complexity.

## Tool Definition and Binding

The session demonstrates how tools are defined using LangChain's decorator-based approach. Each tool requires a name and description—critically, the description is what the LLM uses to understand when the tool should be invoked. Tools are then bound to the LLM so it can include them in its decision-making process.

The presentation shows the internal representation of tools as seen by the LLM: structured objects containing the function name, description, parameters, and expected output format. This visibility into how tools are represented is valuable for debugging why an agent might fail to use a tool appropriately.

## Debugging and Tracing in Production

A pivotal moment in the presentation occurs when a bug is discovered: the agent was asked to count characters in Will Smith's middle name, but instead of searching the web for this information, it relied on its (incorrect) internal knowledge. This leads to a discussion of production debugging practices.

The presenter advocates for integrating tracing systems like LangSmith to observe agent decision-making in production. Through the LangSmith interface, developers can inspect the exact point where the agent decided to use (or not use) a particular tool, view the inputs and outputs at each step, and iterate on prompts using playground features.

The fix involved modifying the prompt to explicitly instruct the agent: "Don't count on your previous knowledge—search the web instead." This illustrates a common production pattern where agent behavior must be constrained through careful prompt engineering to avoid over-reliance on potentially incorrect training data.

## Workflow Engineering: A Production Design Paradigm

The concept of "workflow engineering" is introduced as a less commonly discussed but critical aspect of production agent systems. This refers to the deliberate design decisions about how much autonomy to grant agents versus how much structure to enforce through human-defined workflows.

The presenter outlines a spectrum of approaches:

**Router Plus Code**: Maximum human control. The LLM only decides which pre-defined workflow to execute, but the workflows themselves are hard-coded. The presenter notes this is currently the most common pattern in production due to its predictability.

**Plan and Execute**: The agent constructs a plan of steps but then executes linearly without cycles. There's no ability to backtrack and revise earlier steps.

**State Machine**: A graph-based approach where each node represents an agent, edges define possible transitions, and conditional logic determines routing. This provides a balance of dynamism and control.

**Fully Autonomous**: The agent-executor loop with no restrictions. While maximally flexible, this offers the least control and is hardest to debug in production.

The presenter predicts that while router-plus-code dominates current production systems, state machine approaches will become increasingly prevalent as tooling matures.

## State Management for Multi-Turn Conversations

A fundamental challenge in production agent systems is maintaining conversation state across interactions. The presentation demonstrates this through a practical example: a user asks about Apple stock prices, then follows up with "and what about Microsoft?" The second query only makes sense in the context of the first.

The naive approach of stuffing conversation history into the prompt works but raises deployment questions: where is state stored? In serverless architectures with multiple replicas, local state is problematic.

The solution presented uses LangGraph's checkpointing mechanism with SQLite (demonstrating a local memory connection string, with notes that production would use a remote database). Each conversation receives a thread ID, and the checkpoint system automatically persists and retrieves conversation state between interactions. This enables stateless compute instances while maintaining stateful conversations—a crucial pattern for scalable production deployments.

## Multi-Agent Systems: The Blogger Example

The presentation's most sophisticated example involves a multi-agent system for blog writing, consisting of:

- **Supervisor Agent**: Orchestrates the workflow, critiques outputs, and routes tasks
- **Researcher Agent**: Uses web search tools (DuckDuckGo) to gather information on topics
- **Blogger Agent**: Produces written content based on research findings

The state object expands significantly to facilitate inter-agent communication, including fields for: the current turn (which agent should act), researcher findings (a list to accumulate multiple research iterations), blogger drafts, the overall topic, and task specifications for each agent.

The supervisor implements routing logic using OpenAI function calling, where the functions serve as routing directives rather than actual implementations. When invoked, the supervisor can decide to: send work to the researcher (with specific elaboration requests), send work to the blogger, or finish the workflow.

A critical production consideration is demonstrated: the system includes safeguards limiting how many times the supervisor can send work back to the researcher (three iterations maximum) before being forced to proceed to the blogger. Such constraints prevent infinite loops and ensure bounded execution time—essential for production systems.

## Debugging Multi-Agent Systems

The presentation honestly acknowledges that the multi-agent demo didn't work perfectly during the live session, leading to an important discussion about debugging strategies. Unlike traditional software where a broken button consistently fails in reproducible ways, LLM applications may work correctly on some inputs but fail on others.

The recommended debugging approach involves:

- Using tracing systems (LangSmith) to understand why routing decisions were made
- Setting breakpoints in routing logic to inspect state
- Iterating on prompts based on observed failures
- Testing with varied inputs to understand failure patterns

This acknowledgment of debugging complexity is refreshingly honest and provides practical guidance for practitioners.

## Multimodal Agents and Web Navigation

The final section introduces GPT-4 Vision-based agents for web navigation as an advanced research direction. The key insight from the "Set-of-Mark" GPT-4V paper is that multimodal models benefit from having images segmented and labeled with numbers, creating a shared vocabulary for referring to specific visual elements.

The implementation combines:

- **Playwright**: Browser automation for clicking, typing, scrolling, waiting, and navigation
- **GPT-4 Vision**: Visual understanding to interpret screenshots and decide actions
- **DOM-based Segmentation**: Using HTML structure to identify and label interactive elements

Because GPT-4 Vision doesn't support function calling in the same way as text models, this agent uses prompt-based (React-style) strategy for action selection. The demo shows the agent navigating to Google, searching for an academic paper, and extracting information—demonstrating potential for agents that can interact with any web interface rather than requiring specific API integrations.

## Key Takeaways and Future Predictions

The presenter concludes with several predictions about the evolution of agent architectures:

- Production systems will transition from router-plus-code toward state machine approaches as frameworks mature
- 2024 and 2025 will be "the years of agents" with significant production adoption
- Similar to how software engineering developed system design paradigms, agent engineering will develop its own architectural patterns
- Senior LLM engineers will increasingly focus on system design (workflow engineering) with implementation becoming more standardized

The combination of prompt engineering and workflow engineering is presented as the dual discipline required for successful production agent systems—understanding both how to instruct individual agents and how to orchestrate their collaboration effectively.