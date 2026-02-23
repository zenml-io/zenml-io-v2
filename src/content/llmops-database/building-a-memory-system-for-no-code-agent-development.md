---
title: "Building a Memory System for No-Code Agent Development"
slug: "building-a-memory-system-for-no-code-agent-development"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "699c0b43ea19bfecb33a844b"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-23T08:21:10.864Z"
  lastUpdated: "2026-02-23T08:21:10.864Z"
  createdOn: "2026-02-23T08:09:39.290Z"
llmopsTags:
  - "poc"
  - "customer-support"
  - "document-processing"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "semantic-search"
  - "mcp"
  - "langchain"
  - "postgresql"
  - "documentation"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Langchain"
summary: "LangChain developed a memory system for their LangSmith Agent Builder, a no-code platform for creating task-specific agents. The problem was that agents performing repetitive specialized tasks needed to retain learnings across sessions to avoid poor user experience. Their solution represented memory as files in a virtual filesystem (stored in Postgres but exposed as files), allowing agents to read and modify their own memory using familiar filesystem operations. The memory system covers procedural memory (AGENTS.md, tools.json), semantic memory (agent skills, knowledge files), and enables agents to self-improve through natural language feedback, eliminating the need for manual configuration updates and creating a more iterative agent building experience."
link: "https://blog.langchain.com/how-we-built-agent-builders-memory-system/"
year: 2026
---

## Overview

LangChain's case study describes the development and deployment of a memory system for their LangSmith Agent Builder, a no-code platform launched in January 2026 that enables technically-lite citizen developers to build task-specific agents. This case study provides valuable insights into production LLM systems, particularly around the challenge of building agents that can learn and adapt over time without requiring users to manually update configurations. The memory system represents a sophisticated approach to operationalizing agent intelligence in a way that scales with user needs while maintaining security and reliability.

The fundamental business problem LangChain addressed was the poor user experience of agents that couldn't remember context across sessions. Unlike general-purpose agents like ChatGPT or Claude that handle diverse unrelated tasks, LangSmith Agent Builder creates agents for specific, repetitive workflows such as email assistance or documentation help. In these scenarios, learnings from one session are highly relevant to subsequent sessions, and requiring users to repeatedly provide the same instructions creates friction and undermines the value proposition of automation.

## Technical Architecture and Design Decisions

The memory system's architecture is built on several key technical decisions that reflect practical LLMOps considerations. LangChain represents all memory as files in what they call a "virtual filesystem" - files that are actually stored in Postgres but exposed to the agent as if they were in a traditional filesystem. This design choice exemplifies a critical LLMOps tradeoff: leveraging the fact that LLMs are highly proficient at working with filesystems (a common pattern in their training data) while maintaining the operational benefits of a database backend such as easier management, better scalability, and more efficient querying.

The virtual filesystem is natively supported by their Deep Agents framework and is completely pluggable, allowing different storage layers like S3 or MySQL. This abstraction demonstrates good architectural practice in production LLM systems - separating the interface that the LLM interacts with from the underlying infrastructure concerns. The agent doesn't need specialized tools to manipulate memory; it simply uses standard filesystem operations, reducing the complexity of the agent's tool repertoire and leveraging existing model capabilities.

## Memory Taxonomy and Implementation

LangChain's memory implementation is informed by the COALA paper's taxonomy of agent memory, which divides memory into three categories: procedural (rules determining behavior), semantic (facts about the world), and episodic (sequences of past behavior). The production system implements two of these three categories through specific file conventions.

Procedural memory is encoded in AGENTS.md files that define core agent directives, and tools.json files that specify available tools. For tools, they use a custom tools.json format rather than the standard mcp.json because they need to expose only subsets of tools from MCP (Model Context Protocol) servers to avoid context overflow - a practical production concern when managing token budgets. Semantic memory consists of agent skills (specialized instructions for specific tasks) and other knowledge files that agents can reference and edit. Interestingly, they deliberately omitted episodic memory initially, judging it less critical for task-specific agents than for general-purpose ones, though they plan to add it by exposing previous conversations as files.

The use of industry standards wherever possible (AGENTS.md for core instructions, agent skills format, and formats similar to Claude Code for subagents) reflects a mature approach to building production systems. This standardization serves multiple purposes: it makes the system more familiar to users, enables portability of agents to other harnesses, and reduces the learning curve. The portability aspect is particularly notable from an LLMOps perspective - agents built in Agent Builder can theoretically be exported and run in other environments like the Deep Agents CLI or even completely different harnesses.

## The Deep Agents Abstraction Layer

A crucial element enabling the no-code experience is the Deep Agents harness that Agent Builder is built upon. Deep Agents abstracts away complex context engineering challenges including summarization, tool call offloading, and planning. This abstraction layer allows developers to steer agents with relatively simple configuration rather than code or domain-specific languages. From an LLMOps standpoint, this represents the pattern of building reusable infrastructure that handles common challenges across multiple use cases, allowing product teams to focus on domain-specific problems rather than repeatedly solving foundational issues.

The fact that agents can edit their memory "in the hot path" - that is, during execution - while maintaining system stability speaks to the robustness of this architecture. The agent reads its memory files at runtime, makes decisions based on that context, and can modify those same files to reflect new learnings, all within a single session.

## The Primacy of Prompt Engineering

One of the most candid and valuable insights from this case study is the acknowledgment that prompt engineering was the hardest part of building the memory system. LangChain dedicated one full-time person to prompting for memory, representing a large percentage of their team. This staffing decision underscores an important reality in production LLM systems: despite the promise of foundation models' generalization capabilities, achieving reliable behavior in specific use cases still requires significant prompt engineering effort.

The examples of prompt engineering challenges they encountered are instructive for practitioners: agents not remembering when they should, remembering when they shouldn't, writing too much to AGENTS.md instead of skills files, and not knowing the correct format for skills files. In nearly all cases of poor agent performance, the solution was improving the prompt rather than changing system architecture. This finding suggests that in many production LLM systems, the prompt is the primary control surface, and organizations should invest accordingly in prompt engineering expertise and tooling.

## Validation and Reliability Mechanisms

LangChain implemented explicit validation for files with specific schemas, such as tools.json requiring valid MCP servers and skills files needing proper frontmatter. When agents generated invalid files, the system throws errors back to the LLM rather than committing the file. This validation pattern represents a critical reliability practice in production LLM systems - treating LLM outputs as untrusted until validated, and creating feedback loops that allow the model to correct its mistakes.

The validation approach also demonstrates the value of structured outputs in LLMOps. By constraining agent modifications to specific file formats with schemas, the system gains the ability to programmatically verify correctness before persisting changes. This is significantly more reliable than allowing free-form modifications that might break the system.

## Agent Behavior Patterns and Limitations

LangChain observed specific patterns in how agents interacted with memory that inform production LLM system design. Agents proved good at adding specific information to files but struggled with compaction and generalization. For example, an email assistant started listing individual vendors to ignore rather than updating itself to ignore all cold outreach. This limitation reveals that current LLMs, while capable of pattern matching and information extraction, may not spontaneously perform the abstraction and generalization that humans would naturally do.

This observation led to architectural decisions around supporting explicit user prompting for memory management. Users can prompt agents to reflect on conversations and update memory for missed items, or to compact memory. This represents a pragmatic approach to production LLM systems: rather than waiting for models to perfectly handle all edge cases, design user-facing controls that let users guide the system when automated behavior falls short.

## Security and Human-in-the-Loop Design

All memory edits require explicit human approval before updating, a decision LangChain made primarily to minimize prompt injection attack vectors. The system does expose a "yolo mode" for users less concerned about security, but the default is conservative. This design choice reflects mature thinking about production LLM security: agents that can modify their own instructions are particularly vulnerable to prompt injection attacks that could permanently alter their behavior.

The human-in-the-loop pattern serves dual purposes: security and quality control. Users can review proposed memory updates before they're committed, preventing both malicious modifications and well-intentioned but incorrect changes. This adds latency to the learning process but ensures that the agent's knowledge base remains trustworthy. The tradeoff between automation and control is explicit and configurable, which is appropriate for a platform serving diverse use cases with varying risk profiles.

## Iterative Development and User Experience

The memory system enables a fundamentally different agent building workflow. Rather than manually updating configuration files after testing reveals needed changes, users can provide natural language feedback that causes the agent to update itself. The concrete example provided in the case study - a meeting notes summarizer that evolves from simple paragraph summaries to a sophisticated system handling multiple meeting types, specific personnel, and detailed formatting preferences - illustrates how memory enables incremental refinement.

This iterative approach addresses a core challenge in agent development: it's difficult to specify agent behavior completely upfront because you don't know what the agent will do until you try it. The memory system allows specifications to emerge through use rather than requiring complete upfront design. From an LLMOps perspective, this represents a shift from "configuration as code" to "configuration as conversation," where the agent's specification builds itself through corrections rather than explicit programming.

However, it's worth noting that this is still a form of prompt engineering - just distributed over time and expressed in natural language rather than concentrated in initial system prompts. The cognitive load shifts from upfront design to ongoing refinement, which may or may not be easier depending on the use case and user.

## Future Directions and System Evolution

The planned enhancements reveal areas where the current system has limitations. The addition of episodic memory (exposing previous conversations as files) would complete the COALA taxonomy and enable agents to reference specific past interactions rather than just generalized learnings. Background memory processes running as cron jobs would allow reflection and generalization to happen outside the hot path, potentially addressing the compaction problem without requiring user prompting.

The planned semantic search capability acknowledges that while grep and glob are good starting points for memory retrieval, they have limitations. Semantic search over memory would require embeddings and vector search infrastructure, adding complexity but enabling more sophisticated retrieval patterns. The proposal for different memory levels (user-level, org-level, agent-level) through different directories shows thinking about how memory systems might scale beyond single agents to support organizational knowledge sharing.

## Critical Assessment and Tradeoffs

While LangChain's memory system represents sophisticated engineering, several aspects warrant balanced consideration. The claim that this enables a "no-code experience" should be nuanced: users still need to understand agent behavior, provide effective feedback, and recognize when memory updates are appropriate. The cognitive model shifts from understanding a DSL to understanding how to communicate with an agent, which may not be simpler for all users.

The reliance on prompt engineering as the primary lever for system behavior means that the system's reliability is bounded by the reliability of the underlying LLM's instruction-following capabilities. Changes in base model behavior (through updates or model switching) could require significant prompt re-engineering. This creates a form of technical debt that's harder to manage than traditional code.

The human-in-the-loop requirement for memory updates, while security-conscious, may not scale well for high-velocity use cases. The "yolo mode" option suggests recognition of this limitation, but it's unclear how organizations should make the tradeoff between security and velocity in practice.

The file-based memory representation, while clever in leveraging model capabilities with filesystems, may face limitations as agents become more complex. The case study acknowledges that agents sometimes write information to the wrong files or fail to organize information appropriately. As memory grows, the filesystem metaphor may become strained, particularly around search and retrieval.

## Production Readiness and Operational Considerations

The architecture demonstrates several production-ready characteristics: storage in Postgres rather than actual filesystems provides better operational properties, the pluggable storage layer enables flexibility, validation prevents invalid states, and human-in-the-loop provides safety. However, the case study doesn't address several operational concerns that would be important for assessing production readiness: how is memory versioned and rolled back if agents make bad updates? How is memory size managed as it grows? What are the performance characteristics of memory retrieval at scale? How are memory updates monitored and audited?

The acknowledgment that one full-time person focused on prompt engineering for memory suggests ongoing operational overhead. As the system evolves and handles more edge cases, maintaining prompt quality could become a significant operational burden.

## Conclusion and Broader Implications

LangChain's memory system for Agent Builder represents a sophisticated approach to a genuine production LLM challenge: enabling agents to improve through use without requiring manual configuration updates. The technical architecture demonstrates mature thinking about leveraging model capabilities (filesystem proficiency) while maintaining operational requirements (database storage), and the security-conscious defaults reflect awareness of prompt injection risks.

The candid discussion of challenges - particularly around prompt engineering effort and agent limitations in generalization - provides valuable insights for practitioners. The system makes explicit tradeoffs between automation and control, enabling different risk profiles through configuration.

From an LLMOps perspective, this case study illustrates several important patterns: the value of abstraction layers that handle common challenges, the continued primacy of prompt engineering in production systems, the importance of validation and feedback loops, and the potential for agents to maintain their own specifications through natural language interaction. However, it also reveals current limitations in LLM capabilities around abstraction and generalization, and raises questions about the operational overhead of maintaining prompt-driven systems at scale.