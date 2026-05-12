---
title: "Context Management and Memory Strategies for Production AI Agents"
slug: "context-management-and-memory-strategies-for-production-ai-agents"
draft: false
llmopsTags:
  - "data-analysis"
  - "poc"
  - "prompt-engineering"
  - "memory"
  - "multi-agent-systems"
  - "agent-based"
  - "harness-engineering"
  - "token-optimization"
  - "evals"
  - "databases"
  - "monitoring"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Arize"
summary: "Arize built Alex, an AI agent designed to help users build AI applications by analyzing observability traces and span data from their platform. The team encountered significant context management challenges as conversations grew and data volumes multiplied, creating a vicious loop where the agent analyzing the data became constrained by that same data. They solved this through a three-part strategy: implementing smart truncation with memory stores (keeping first and last 100 characters while storing the middle for retrieval), separating context from memory management, and delegating heavy data operations to sub-agents. This approach, combined with long session evaluations, enabled Alex to handle complex, multi-turn conversations while maintaining performance and avoiding context window limitations."
link: "https://www.youtube.com/watch?v=esY99nYXxR4"
year: 2026
seo:
  title: "Arize: Context Management and Memory Strategies for Production AI Agents - ZenML LLMOps Database"
  description: "Arize built Alex, an AI agent designed to help users build AI applications by analyzing observability traces and span data from their platform. The team encountered significant context management challenges as conversations grew and data volumes multiplied, creating a vicious loop where the agent analyzing the data became constrained by that same data. They solved this through a three-part strategy: implementing smart truncation with memory stores (keeping first and last 100 characters while storing the middle for retrieval), separating context from memory management, and delegating heavy data operations to sub-agents. This approach, combined with long session evaluations, enabled Alex to handle complex, multi-turn conversations while maintaining performance and avoiding context window limitations."
  canonical: "https://www.zenml.io/llmops-database/context-management-and-memory-strategies-for-production-ai-agents"
  ogTitle: "Arize: Context Management and Memory Strategies for Production AI Agents - ZenML LLMOps Database"
  ogDescription: "Arize built Alex, an AI agent designed to help users build AI applications by analyzing observability traces and span data from their platform. The team encountered significant context management challenges as conversations grew and data volumes multiplied, creating a vicious loop where the agent analyzing the data became constrained by that same data. They solved this through a three-part strategy: implementing smart truncation with memory stores (keeping first and last 100 characters while storing the middle for retrieval), separating context from memory management, and delegating heavy data operations to sub-agents. This approach, combined with long session evaluations, enabled Alex to handle complex, multi-turn conversations while maintaining performance and avoiding context window limitations."
notion:
  pageId: "35df8dff-2538-800e-8bea-dac268da74ae"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:32:00.000Z"
  lastEditedTime: "2026-05-11T20:32:00.000Z"
  publishedAt: "2026-05-11T20:39:27Z"
---

## Overview

Arize developed Alex, an AI agent harness designed to help AI engineers and product managers build AI applications. The case study focuses on the production challenges of context management when operating an AI agent at scale. Alex was built to run on top of Arize's observability platform, meaning it had to analyze traces and spans from other AI applications, creating a unique and challenging context management problem. The team spent close to a year developing and refining their approach to context engineering, learning critical lessons about what works and what doesn't in production environments.

The speaker, Salian, who serves as head of product at Arize with a technical background in data science, functions as both a product manager and part-time AI engineer, contributing directly to Alex's codebase. This dual role provided firsthand experience with the pain points of building production agents, which informed the development of tools to help other teams facing similar challenges. The presentation emphasizes that context engineering has become more critical than prompt engineering, a shift that became apparent in mid-2025 based on industry discussions and experiences.

## The Core Problem: Context Engineering as a Production Challenge

The fundamental challenge Arize faced was that context management matters far beyond simply fitting within token limits. Context engineering involves strategically choosing what the model sees, not just staying under token constraints and stuffing in as much data as possible. This distinction is critical for production systems because the data you choose to let the model see can make or break the user experience. The team frames context management as fundamentally a product and UX problem, not merely an engineering challenge. If an agent lacks the right context, it produces bad answers, and if users receive bad answers, they won't use the product.

Alex operates on trace and span data from Arize's observability platform. A single trace includes user input, prompts, and extensive metadata. As users interact with Alex, the context grows substantially. The problem multiplies exponentially when users want to see patterns across multiple traces rather than analyzing just one. This created a non-negotiable requirement: the team had to be strategic about context management and determine what information was most important for Alex to access and when it needed to see everything.

## The Vicious Loop

The team built Alex using Alex itself, applying the principle that if they could build an agent that made their own lives easier in building their application, they would have something users would want. However, this created a problematic feedback loop. Alex would run on trace and span data, the spans would grow with too much data, they would hit context limits, Alex would fail, and that failure data would be captured in spans. When the system tried again, it would add more data, run again, and fail again. The system analyzing the data became constrained by that very data, creating a major blocker for success. Alex could never perform adequately unless it could understand and process all this data.

## Escaping the Loop: Three Key Strategies

The team developed a three-part approach to escape this vicious cycle: learning to control context effectively, separating context from memory, and moving heavy computational work out of the main agent into sub-agents.

### Naive Truncation: First Attempt

The initial approach was straightforward naive truncation, taking just the first 100 characters of the context blob and dropping the rest. This worked temporarily for simple cases but quickly revealed fundamental flaws. The agent essentially forgot everything beyond those initial characters. Follow-up questions appeared as entirely new conversations to the agent. When a user asked about the most common inputs and received an answer, a follow-up question asking for more details about a specific input resulted in the agent having no understanding of what was being referenced. The key lesson was that over-truncation broke the reasoning capabilities of the agent entirely.

### Summarization: Second Attempt

The next approach seemed obvious: use LLMs to summarize all context into a shorter token count. Since LLMs are generally effective at summarization, this appeared to be a natural solution. However, it proved too inconsistent in practice. There was no control over what information the model deemed important during summarization. The team was essentially leaving it entirely to the LLM to examine the data and decide what to preserve, which proved unreliable for their use case. Summarization was abandoned as an approach fairly quickly.

### Smart Truncation with Memory: The Working Solution

The solution that actually proved successful in production is what the team calls smart truncation memory, which combines truncation with compression and memory storage. This system takes the first 100 characters from the beginning and the last 100 characters from the tail of the context. The middle portion is extracted and stored in a memory system that remains accessible to the agent. This approach handles duplicate messages effectively, which is particularly important because tool calls can be extremely long and Alex makes many tool calls. By keeping only the latest result, not resetting the system prompt, and truncating the middle while preserving head and tail, the system maintains coherence. Critically, if Alex determines that a previous tool call or message from earlier in the conversation is important, it can retrieve that context from memory at any point. This gives Alex control over what context is actually important rather than making those decisions predetermined. This approach has been stable for several months in production without requiring significant modifications.

The philosophy underlying this approach is that context decides what the model sees while memory decides what survives. This separation of concerns proved essential for managing long-running conversations effectively.

## Long Session Challenges and Evaluation

Even with smart truncation and memory management working well, the team encountered another production challenge: long sessions. Users typically don't restart their chats, preferring to continue in one conversation as they navigate across different pages and tasks. This means conversations grow continuously, and failures tend to appear late in extended sessions. Initially, the smart truncation approach seemed successful, but as conversations grew longer, failures emerged that weren't discovered until users reported them or the team analyzed usage data and noticed Alex forgetting information far into conversations.

The solution was implementing long session evaluations, which may not directly relate to context management implementation but provide crucial signals about how well the context management strategy is performing. Long sessions naturally occur with these applications, so testing them systematically became essential. The team loads 10 conversation turns and then tests the 11th turn to understand how context management performs over time. This makes bugs testable proactively rather than waiting for discovery through production failures or user reports. This evaluation approach is a key part of their production LLMOps strategy.

## Sub-Agents: Distributing Context Load

Even with testable long sessions and effective truncation strategies, there remained cases where there was simply too much data for a single agent to handle effectively. A critical realization emerged: not all context belongs in the same agent. This led to the development of a sub-agent architecture.

The search task provides a clear example. When Alex searches over data in Arize, whether in the main conversation or examining a single trace stack, there can be hundreds of spans to analyze. Alex must determine which data to examine, which involves multiple queries, massive amounts of data, and significant intermediate reasoning happening step by step. The team concluded that not all this information needs to live in the main conversation thread.

Initially, they had one main agent handling trace skills, but determined this wasn't necessary or optimal. The solution was to offload heavy tasks to sub-agents, allowing the main conversation to stay small. Before implementing sub-agents, the main conversation included chat history, heavy data, and search functionality all in one context managed by a single agent. After the architectural change, they separated concerns: the main agent handles the conversation with chat history and light context only, keeping it deliberately lightweight. The main agent can delegate to sub-agents for heavy lifting, and that's where heavy data context lives. Once the sub-agent produces results, those can be passed back to the main agent, allowing the user to continue the conversation. The main agent can still retrieve from the memory store when it needs additional context.

This sub-agent approach became a game changer for the team. After figuring out this pattern, they rolled out numerous sub-agents to handle data-intensive operations. The speaker expressed surprise that summarization didn't work as expected, since it seemed like the obvious choice, but the combination of truncation with memory storage proved most successful.

## Ongoing Challenges and Future Work

Despite significant progress, the team continues to face challenges and is actively working on improvements. Several areas remain difficult to fully solve in production.

### Huge Context Challenges

Very large prompts or inputs still hit provider limits. Because Arize operates an agent on agent data, system prompts, user messages, and conversation history from their customers all become data that Alex must understand. As customer context grows, Arize faces a compounding context issue. The pattern they repeatedly return to is creating more sub-agents, continually breaking things up and distributing context handling across different components. This remains an evolving strategy that may need further refinement.

### Long-Term Memory

Long memory remains hard, and the engineering team was actively working on this at the time of the presentation. Long sessions are tricky, and the team observed conversation lengths growing from under 10 turns when they started to users pushing beyond 20 turns or more. This growth happens because users travel across the application using Alex to accomplish longer workflows. Finding Alex helpful, they ask more questions, which creates challenges for maintaining context effectively.

The current focus is on implementing real long-term memory. Currently, Alex's memory is really just the context with the memory store that can be leveraged, but this doesn't constitute true long-term memory. This limitation becomes important because users want to reference issues they've previously discussed with Alex. If they start a new chat, Alex has no context from previous sessions. Adding long-term memory is viewed as a potential game changer for the product.

### Context Selection Heuristics

Context selection remains largely heuristic-based, using the basic first 100, last 100 approach. The team continually questions whether they're keeping the right things. They don't yet have a principled context budget or clear metrics for context quality. Currently, they rely heavily on evaluations to measure whether context decisions were appropriate, but they recognize that something more sophisticated is needed and are researching better approaches.

Interestingly, when Claude's code was released publicly and became available for review, the team was surprised to find that Claude uses a similar truncation and compression strategy to what Arize developed. The team had hoped to learn some secrets from Claude's implementation, but it appears different teams are converging on similar solutions independently, suggesting that continued research is necessary across the industry.

## Key Takeaways and Production Lessons

The presentation emphasized several key lessons for teams building production AI agents. Context management is inherently iterative, and the team continues learning and optimizing. Three things are particularly clear from their experience and from working with their user base:

First, context engineering genuinely matters. It's not just theoretical but has practical impact on agent success. Second, memory matters and must be thoughtfully implemented as a separate concern from immediate context. Third, evaluation matters critically for understanding how well your context strategies perform in production, especially over long sessions.

The final key insight is that agents don't fail because of prompts; they fail because of context. In the early days of LLM applications, prompts were everything and everyone focused on prompt engineering. Now, both Arize internally and across their user base, the focus has shifted decisively to context engineering. There are many strategies that can be employed, but recognizing that context is the critical factor represents a fundamental shift in how production LLM applications are built and maintained.

The case study represents a mature, production-focused approach to building AI agents, with the team learning through real-world usage, failures, and iteration. Their willingness to try obvious approaches like summarization, discover they don't work, and develop more nuanced solutions reflects the reality of production LLMOps work. The emphasis on evaluation, the product perspective on context management, and the architectural decision to use sub-agents all represent practical patterns that other teams can learn from when building similar production systems.
