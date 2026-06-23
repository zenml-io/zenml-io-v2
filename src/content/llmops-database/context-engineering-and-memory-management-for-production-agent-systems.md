---
title: "Context Engineering and Memory Management for Production Agent Systems"
slug: "context-engineering-and-memory-management-for-production-agent-systems"
draft: false
llmopsTags:
  - "code-generation"
  - "prompt-engineering"
  - "memory"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "token-optimization"
  - "documentation"
  - "guardrails"
  - "anthropic"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic's Applied AI team has developed sophisticated approaches to context engineering and memory management for production AI agent deployments, addressing the challenge of translating raw model intelligence into durable, scalable products. The solution evolved from simple markdown files injected at session start to sophisticated file-system-based memory architectures with versioning, concurrency controls, and permissioning. The team introduced \"dreaming,\" an out-of-band batch process where dedicated agents review session transcripts to identify patterns and propose memory improvements. Results include improved accuracy on repeated tasks, reduced latency and cost through better one-shot performance, and autonomous learning that frees developers to focus on product improvements rather than manual memory curation."
link: "https://www.youtube.com/watch?v=tTcxVv8HHNw"
year: 2026
seo:
  title: "Anthropic: Context Engineering and Memory Management for Production Agent Systems - ZenML LLMOps Database"
  description: "Anthropic's Applied AI team has developed sophisticated approaches to context engineering and memory management for production AI agent deployments, addressing the challenge of translating raw model intelligence into durable, scalable products. The solution evolved from simple markdown files injected at session start to sophisticated file-system-based memory architectures with versioning, concurrency controls, and permissioning. The team introduced \"dreaming,\" an out-of-band batch process where dedicated agents review session transcripts to identify patterns and propose memory improvements. Results include improved accuracy on repeated tasks, reduced latency and cost through better one-shot performance, and autonomous learning that frees developers to focus on product improvements rather than manual memory curation."
  canonical: "https://www.zenml.io/llmops-database/context-engineering-and-memory-management-for-production-agent-systems"
  ogTitle: "Anthropic: Context Engineering and Memory Management for Production Agent Systems - ZenML LLMOps Database"
  ogDescription: "Anthropic's Applied AI team has developed sophisticated approaches to context engineering and memory management for production AI agent deployments, addressing the challenge of translating raw model intelligence into durable, scalable products. The solution evolved from simple markdown files injected at session start to sophisticated file-system-based memory architectures with versioning, concurrency controls, and permissioning. The team introduced \"dreaming,\" an out-of-band batch process where dedicated agents review session transcripts to identify patterns and propose memory improvements. Results include improved accuracy on repeated tasks, reduced latency and cost through better one-shot performance, and autonomous learning that frees developers to focus on product improvements rather than manual memory curation."
notion:
  pageId: "387f8dff-2538-801b-90c2-f00e1ccc5d6b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-22T14:41:00.000Z"
  lastEditedTime: "2026-06-22T14:41:00.000Z"
  publishedAt: "2026-06-22T14:48:03Z"
---

## Overview

Anthropic's Applied AI team works at the intersection of research, product, and go-to-market, particularly with startups and founders who push the boundaries of what is possible with frontier models and agent systems. Through this work, they have accumulated substantial experience in what it takes to translate raw model intelligence into production-ready systems. The central challenge they identified is that model intelligence alone does not compound in real-world deployments because agents need context specific to the tasks, organizations, and environments in which they operate. This context is often orthogonal to general model intelligence, meaning that even the newest, most capable models will not automatically know how to succeed in a specific organizational setting without appropriate context engineering.

The presentation traces the evolution of context engineering approaches over approximately one year, distilling primitives that have proven effective in production and identifying areas where theoretical approaches encounter practical limitations at scale. The work culminates in a sophisticated memory management system and an innovative concept called "dreaming" that provides out-of-band memory curation to enable genuine continual learning for agent fleets.

## Evolution of Context Engineering Approaches

The journey began with Claude MD files, which were simple markdown files launched alongside Claude Code. These files provided agents with instructions about codebases, organizational structure, and user preferences, injected at the beginning of each session. The approach proved unreasonably effective at steering agent behavior toward what mattered and aligning actions with user preferences. However, limitations emerged around context bloat, particularly as preference files grew very long and began to overwhelm the available context window.

The next innovation was memory tools, which explored autonomous memory management by allowing agents to decide when to read, write, and update memories in-band during active sessions. This autonomy proved effective, with agents managing their own learning within the context of ongoing conversations and tasks. The approach demonstrated that agents could be trusted with significant autonomy in memory management decisions.

Skills represented the next major advancement, introducing the concept of progressive disclosure. Skills are designed for procedural workflows where there is a clear opinion about how processes should work end-to-end. The clever architectural innovation is that agents only examine a brief front matter at the top of a skill file before loading it, while the body can contain extensive detail. This allows for deep levels of specification without overloading the model's context window. The analogy offered is of a bookshelf where you scan titles to find relevant books and only read them when needed, such as pulling out a French dictionary when someone speaks to you in French, rather than having all possible dictionaries loaded into memory at all times.

## Current State-of-the-Art: File System-Based Memory

The current state-of-the-art approach that Anthropic recommends involves modeling memory systems as standard file systems. This architecture aggregates learnings from previous approaches: files are populated with markdown, agents use normal file system tools like bash and grep rather than specialized memory APIs, and intelligent indexing enables effective search that mirrors progressive disclosure principles. The key learnings crystallized into three principles: use markdown format for memory storage, allow memories to grow large while providing agents tools to quickly index and search for relevance, and give agents autonomy in writing to memories.

While this approach works well in theory and provides the feeling of continual learning as agents improve at specific tasks over time, significant challenges emerge when scaling to production environments with multiple agents collaborating simultaneously, running over extended time periods, and operating within complex codebases.

## Production Challenges and Solutions

Several critical problems arise in production multi-agent environments. Multiple agents may attempt to write to the same memory file simultaneously, creating race conditions. A single agent encountering a problem might write incorrect information to organization-wide context that all other agents are currently reading, causing failures to cascade across the entire fleet. Human-agent collaboration on shared memory requires careful tracking and auditing. Additionally, memories can become stale as information that was relevant in the past becomes outdated, is written incorrectly, or is even maliciously injected through prompt injection attacks.

To address these challenges, Anthropic developed several production-level guardrails and engineering practices:

**Versioning** is implemented to store all versions of memories, enabling rollback if updates prove ineffective. The system tracks what context prompted each update, including which agent session and transcript resulted in the change, as well as metadata about which agent or human made the modification. This creates a complete audit trail for memory evolution.

**Concurrency control** uses a hashing mechanism to prevent conflicting writes. When an agent decides to update a memory, it takes a hash of the current state, drafts its edit, and then takes another hash before committing. If the two hashes do not match, indicating that another update occurred in the interim, the agent cannot write. Instead, it must re-pull the memory, draft a new update incorporating the intermediate changes, and attempt to commit again. This optimistic concurrency control pattern is essential for scaling multi-agent architectures.

**Permissioning** provides granular access controls across different levels of the memory hierarchy. Memory bases typically contain a mixture of top-level organizational-wide knowledge that has been carefully curated, mid-level context for specific teams or cross-sections, and individual agent scratchpads for working memory. Different permission levels ensure that individual agents cannot unilaterally update critical organizational context (which might be read-only for most agents) while retaining write access to their own scratchpads. This prevents individual agent failures from corrupting shared knowledge bases.

**Portability** recognizes that curated memory systems represent significant organizational investment and should be accessible across multiple product surfaces and systems. Clean API design enables memory to be used by different applications and environments rather than being locked into a single implementation.

## Results of Production Memory Systems

When these production-level memory systems are deployed with appropriate guardrails, they deliver measurable improvements across multiple dimensions. Accuracy improves as agents perform tasks for the second time with better results, having noted memories about what went wrong previously. This accuracy improvement creates second-order effects on speed and cost, as agents spend fewer tokens and can more easily one-shot tasks because they have relevant context. Across different processes, agents complete tasks both better and faster. Perhaps most significantly, autonomous memory writing frees up developer capacity and context to focus on product improvements rather than manual curation, while agents handle continual learning in the background. Once the infrastructure is properly established, this creates a symbiotic relationship where product development and agent learning reinforce each other.

## Limitations of In-Band Memory

Despite these improvements, fundamental limitations remain with in-band memory approaches, where agents read and write to memory within the context of specific sessions. Two primary constraints limit the effectiveness of in-band memory for broader continual learning objectives:

**Split focus and resources** creates an inherent tension. Agents are simultaneously tasked with completing their assigned work while also investing in memory curation that will help future versions of themselves. This creates a difficult optimization problem: how much capacity should an agent dedicate to helping its future self versus accomplishing the immediate task? There are also practical effects on latency, as memory operations consume time during active sessions.

**Visibility limitations** arise because agents only have context from their current session. They cannot see patterns that emerge across multiple sessions, such as the same mistake being repeated in different contexts. When running multiple fleets of agents in different environments, individual agents lack visibility into failures that other agents are encountering, preventing cross-pollination of learning.

## Dreaming: Out-of-Band Memory Curation

To address these limitations, Anthropic introduced "dreaming," a concept for out-of-band memory curation that runs asynchronously with dedicated resources. The analogy offered is of a school system with students submitting work, teachers marking it, and a head teacher reviewing everything. This structure exists in the real world because dedicated individuals with capacity for helping others learn prove highly effective, and because people with visibility across all learners can spot patterns and steer curriculum appropriately.

Dreaming also addresses the problem of memory staleness, providing a process to verify that information remains correct and relevant over time. It represents a second-order process operating over the memory system itself, complementing the first-order process where agents autonomously manage their own memories during sessions.

## Dreaming Architecture and Implementation

The dreaming architecture takes an existing memory store (a collection of memories organized as markdown files in directories) along with session transcripts from agent interactions over a period of time. These transcripts include not just the back-and-forth exchanges between agents and users or systems, but also metadata about tool calls, skills used, and other information central to agent performance. An orchestrator agent reviews these inputs to identify patterns where memory improvements could provide uplift.

The orchestrator deploys a fleet of sub-agents to analyze transcripts in parallel. An important design choice is that these agents can be steered with organization-specific guidance about what kinds of patterns are important or not important to detect, allowing customization of the dreaming process. The orchestrator then reviews responses from sub-agents and determines where patterns are prevalent enough to warrant memory changes.

The output is a new memory store with proposed changes to the existing system. For each proposed change, the system provides examples of transcripts where the pattern was observed and statistics on how prevalent the issue is, offering evidence for why the update is warranted. Humans retain final control over which changes to accept or reject, ensuring that automated improvements remain aligned with organizational preferences.

## Dreaming Use Cases

Several concrete examples illustrate dreaming's capabilities. If the head teacher agent notices that every student working on geography has incorrectly answered a particular question, it might discover that the entire topic is missing from the curriculum (the memory store). The agent can then propose adding that topic so future runs include the necessary information. If all students make the same mistake in a math exam, such as outputting radians instead of degrees, the agent might add instructions about proper calculator configuration. In the agent context, this could mean noticing that a specific tool configuration keeps failing and adding context to prevent the error. Organization-wide patterns might also emerge, such as stylistic preferences like avoiding excessive use of em dashes, prompting organization-wide context updates.

## Production Dreaming Implementation

In production, the dreaming system is designed with careful orchestration. The memory store consists of markdown files organized in directories. The orchestrator deploys sub-agents to analyze transcripts and identify patterns, with the ability to steer these agents toward organization-specific priorities. The orchestrator synthesizes findings and proposes individual changes to the memory store, accompanied by evidence from transcripts and statistics about prevalence. Humans review and approve changes before they are committed to the memory system.

## Parallel Processes: Memory and Dreaming

The complete system operates two parallel processes that complement each other. In-band memory allows agents to use session resources to write memories when they identify important information, with the advantage that improvements are immediately available in the next session. However, agents face competing resource demands between memory curation and task completion, and they lack visibility across sessions and agents.

Out-of-band dreaming provides broader visibility across agent fleets and dedicated token budget specifically for improving agent learning. While this might seem expensive, the costs are offset by improvements in agent performance. Agents become better at one-shotting tasks and have more relevant information available, reducing overall token consumption. The dedicated resources ensure that memory optimization receives appropriate attention without compromising task performance.

## Practical Guidance and Future Directions

The presentation emphasizes starting with simple approaches that work. Context management makes a huge difference to agent performance, and even simple implementations like markdown files, skills with progressive disclosure, and autonomous memory management deliver significant value. As systems scale to many agents, long-running deployments, or complex domains, adding production guardrails around versioning, concurrency, permissioning, and portability becomes essential for safe, verifiable, and auditable memory management.

While coding tasks are a natural fit for these approaches, the techniques are not coding-specific. The presenter uses memory systems for producing presentations, storing context about writing preferences and slide design that develops over time. For organizations seeking to close the loop on continual learning, adding out-of-band processes like dreaming helps consolidate memory, remove stale information, add missing context, and maintain organized memory systems.

## Implementation Availability

When asked about specific implementation recommendations, the presenter noted that many of the production features discussed, including versioning, hashing, and the dreaming API, are available through Anthropic's Managed Agent Solutions, providing an out-of-the-box solution for organizations that want these capabilities without building them from scratch.

## Research and Development Trajectory

The entire journey of context engineering has unfolded over approximately one year, representing a rapidly evolving area of research and development. Anthropic views this as an open space with significant future value and encourages continued innovation and contribution from the broader community. The progression from simple markdown files to sophisticated multi-agent memory systems with out-of-band learning processes illustrates both the rapid pace of advancement and the practical challenges that emerge when moving from theoretical concepts to production deployment at scale.
