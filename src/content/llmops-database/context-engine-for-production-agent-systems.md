---
title: "Context Engine for Production Agent Systems"
slug: "context-engine-for-production-agent-systems"
draft: false
llmopsTags:
  - "code-generation"
  - "customer-support"
  - "document-processing"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "system-prompts"
  - "mcp"
  - "error-handling"
  - "semantic-search"
  - "langchain"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "serverless"
  - "cloudflare"
industryTags: "tech"
company: "Unblocked"
summary: "Unblocked addresses the critical challenge of deploying AI agents in production environments where they make confidently wrong decisions due to missing organizational context. While modern frameworks and cloud infrastructure have made building agents technically trivial, agents deployed without human oversight lack access to the institutional knowledge scattered across Slack conversations, documentation, code repositories, and issue tracking systems. Unblocked's solution is a context engine that connects to multiple organizational data sources, builds a unified model of the organization, and provides agents with reconciled, permission-scoped, and synthesized context rather than raw documents. The demonstration shows an issue enrichment agent for Linear that initially provided incorrect recommendations, but when connected to the context engine, successfully incorporated information from postmortems and Slack discussions to provide accurate guidance that prevented potential outages."
link: "https://www.youtube.com/watch?v=HvMyYLTfvhg"
year: 2026
seo:
  title: "Unblocked: Context Engine for Production Agent Systems - ZenML LLMOps Database"
  description: "Unblocked addresses the critical challenge of deploying AI agents in production environments where they make confidently wrong decisions due to missing organizational context. While modern frameworks and cloud infrastructure have made building agents technically trivial, agents deployed without human oversight lack access to the institutional knowledge scattered across Slack conversations, documentation, code repositories, and issue tracking systems. Unblocked's solution is a context engine that connects to multiple organizational data sources, builds a unified model of the organization, and provides agents with reconciled, permission-scoped, and synthesized context rather than raw documents. The demonstration shows an issue enrichment agent for Linear that initially provided incorrect recommendations, but when connected to the context engine, successfully incorporated information from postmortems and Slack discussions to provide accurate guidance that prevented potential outages."
  canonical: "https://www.zenml.io/llmops-database/context-engine-for-production-agent-systems"
  ogTitle: "Unblocked: Context Engine for Production Agent Systems - ZenML LLMOps Database"
  ogDescription: "Unblocked addresses the critical challenge of deploying AI agents in production environments where they make confidently wrong decisions due to missing organizational context. While modern frameworks and cloud infrastructure have made building agents technically trivial, agents deployed without human oversight lack access to the institutional knowledge scattered across Slack conversations, documentation, code repositories, and issue tracking systems. Unblocked's solution is a context engine that connects to multiple organizational data sources, builds a unified model of the organization, and provides agents with reconciled, permission-scoped, and synthesized context rather than raw documents. The demonstration shows an issue enrichment agent for Linear that initially provided incorrect recommendations, but when connected to the context engine, successfully incorporated information from postmortems and Slack discussions to provide accurate guidance that prevented potential outages."
notion:
  pageId: "3c6f8dff-2538-80a8-8673-cf5b352590fb"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T08:59:00.000Z"
  lastEditedTime: "2026-08-24T08:59:00.000Z"
  publishedAt: "2026-08-24T09:17:16Z"
---

## Overview

This case study from Unblocked, presented by Jeff, a founding engineer, addresses a fundamental challenge in LLMOps: while building and deploying AI agents has become technically straightforward, production agents still make confidently incorrect decisions due to missing organizational context. The presentation demonstrates both the evolution of agent deployment complexity and proposes a context engine as the missing infrastructure layer for reliable production agent systems.

## Evolution of Agent Deployment Complexity

The case study begins by contextualizing the dramatic reduction in effort required to deploy agents. Six months prior to the presentation, building an agent required a team's effort over an entire quarter. This was because agents represent more than just models and tools—they encompass all the infrastructure required for a production service. Several critical systems were necessary, each representing significant engineering investment:

**Checkpoint and State Persistence** emerged as a crucial requirement because agent runs are typically long-lived and stateful, while infrastructure itself is ephemeral. Without durability mechanisms, crashes lead to state loss including message history, tool calls, and the agent's position in its execution loop. Without these, resuming sessions becomes impossible. Restarting sessions proves expensive in multiple dimensions: wasted tokens from the original run, increased latency from the user perspective, and the risk of duplicating side effects that the agent may have already performed.

**Sandbox Infrastructure** became necessary as organizations run increasing amounts of agent-generated code and third-party code on their infrastructure. Isolated sandboxes prevent unauthorized access to environment secrets, restrict unnecessary network access, and protect shared hosts from being taken down by potentially problematic code execution.

**Observability** addressed the challenge of answering "Where did this fail?" in complex agent systems, requiring tracking logs and traces across multiple distributed systems. Importantly, none of these infrastructure components actually improve an agent's capabilities—they are simply taxes organizations must pay to get agents into production.

The ecosystem has since matured significantly. Cloud infrastructure providers including Cloudflare, Vercel, and AWS have abstracted away much of this complexity by building primitives that frameworks like Flu, Vercel AI, and Maestra can leverage. This consolidation allows developers to focus on the core agent logic that delivers value to teams and customers rather than wrestling with infrastructure concerns.

The demonstration using Flu and Cloudflare shows that defining an agent now requires relatively minimal code. The key elements are selecting which model to use, defining instructions or the system prompt, specifying the tools the agent can access, and identifying the sandbox location where code executes. This represents a dramatic simplification from the previous multi-system architecture.

## The Problem: Confidently Wrong Decisions in Production

The core problem Unblocked addresses is illustrated through a concrete example of an issue enrichment system for Linear. The agent was designed to fetch Linear tickets, determine whether they represent features or bugs, perform code searching, and provide plans for next steps. The specific example involved a performance degradation issue in Unblocked's own agentic QA pipeline, where time to first character had increased to 3-4 seconds when it should be in the hundreds of milliseconds.

When the agent processed this issue, it fetched the ticket, accessed the code repository, performed reasoning over the available information, and recommended re-enabling async dispatch to allow more parallel execution in the QA pipeline. The recommendation appeared logical and well-reasoned. However, it was incorrect—this specific change had caused an outage days earlier, and a support engineer had explicitly disabled it before the ticket was created.

The root cause of this failure was missing context. The agent lacked access to the Slack discussion where engineers discussed the outage, analyzed what went wrong, determined the fix, and decided on next steps. It also missed the postmortem Linear ticket documenting the incident. The agent had a narrow understanding limited to the immediate issue ticket and code repository, without the broader organizational knowledge about recent incidents and decisions.

This becomes particularly problematic because the agent was deployed as a background agent operating without human oversight. It would make these mistakes silently, potentially misinforming teammates and other agents that might depend on its outputs. This represents a critical failure mode for production agent systems.

## The Human-in-the-Loop Context Layer

An important insight from the case study is understanding why these failures don't manifest as severely when using agents locally. When humans work with agents interactively, they act as a context layer, asking questions, catching errors, and supplying missing facts at every turn. Humans know why code is structured a certain way, what broke previously, and what decisions have been made. The agent, in contrast, only has explicit instructions, specifically granted tools and skills, the code, and the immediate ticket.

When humans are in the loop, they babysit the agent and catch course corrections as needed. But as agents have become trivially easy to deploy—as demonstrated with the Flu and Cloudflare example—deploying them without human oversight becomes increasingly common. In these scenarios, missing context becomes a critical failure point. The intuition and institutional knowledge that humans provide must be replaced by systematic infrastructure.

## The Context Engine Solution

Unblocked's proposed solution is a context engine, which they define as a system that provides task-relevant information based on who is requesting it and what matters in that context. The context engine distinguishes itself from simpler approaches through several key capabilities:

It resolves conflicts across multiple datasets rather than presenting contradictory information. It understands and respects access rules, providing only information that the requesting agent or user has permission to access. Most importantly, it delivers synthesized understanding that agents can act upon directly, rather than simply returning lists of documents that require additional reasoning.

The architecture works by recognizing that agents need context beyond source code. Just as human engineers rely on Slack discussions for decisions, documentation for best practices, and ticket systems for requirements, agents need access to this same organizational knowledge. Unblocked connects these diverse sources—documentation, code, tickets, and conversations—and builds a unified model of the organization and its systems.

This model makes information generally available to agents, but crucially, agents receive only a subset of that data that has been reconciled, ranked by relevance, and scoped to appropriate permissions. The transformation is from scattered context to grounded, synthesized context.

## Distinction from MCP (Model Context Protocol)

The presentation explicitly addresses why the Model Context Protocol alone doesn't solve this problem. Organizations could theoretically connect separate MCP servers for Slack, Linear, GitHub, and other systems, making all that data technically accessible. However, Unblocked argues that access is not the same as understanding.

MCP hands agents raw results, depending on the agent to decide what to believe. This leads to several problems: agents get flooded with irrelevant data, context windows fill up with unnecessary information, and context costs increase. Additionally, MCP leaves conflict resolution to the individual agent making ad hoc decisions when Linear and Slack data contradict each other, rather than having systematic reconciliation.

## Demonstration of Context Engine Impact

The demonstration revisits the same Linear issue enrichment scenario but with the context engine connected. The agent fetches the Linear ticket as before, but now also calls the Unblocked context engine. The engine identifies the relevant postmortem ticket and the Slack conversation where engineers discussed the issue. Critically, it returns a synthesized understanding rather than raw documents, so the agent doesn't need to reason from scratch over those sources.

With this additional context, the agent's recommendation changes from the incorrect suggestion that would cause another outage to a correct recommendation that prevents problems. This demonstrates the practical impact of proper context integration on agent reliability in production.

## Broader Applications

While the demonstration focuses on issue ticket management, the presentation suggests broader applications for the context engine approach. In coding scenarios, using the context engine to hydrate agent plans can significantly reduce context requirements and token costs when working with tools like Copilot or Cursor. For code review, it enables PRs to appear as if reviewed by an organizational expert who understands historical context and best practices. For customer success and sales teams, it surfaces correct answers grounded in organizational knowledge rather than generic responses.

The common thread across these applications is providing agents with institutional and tribal knowledge—the implicit understanding that experienced team members possess about why things are the way they are, what has been tried before, and what decisions have been made.

## LLMOps Implications and Assessment

From an LLMOps perspective, this case study highlights several critical considerations for production agent systems:

**Infrastructure Evolution**: The dramatic simplification of base agent deployment through cloud primitives and frameworks has lowered barriers to entry but hasn't solved fundamental reliability challenges. The ease of deployment may actually exacerbate problems by enabling deployment of agents that lack necessary context.

**State Management**: The emphasis on checkpoint and state persistence reflects the stateful nature of agent interactions and the need for durability in production systems. This remains a fundamental LLMOps concern even as other infrastructure challenges are abstracted away.

**Observability Requirements**: Multi-system tracing and logging remain essential for debugging agent failures, though the case study suggests observability alone doesn't prevent the types of context-driven errors demonstrated.

**Context as Infrastructure**: The central argument positions context management as a fundamental infrastructure layer for reliable agent systems, analogous to how state management and observability are recognized infrastructure concerns. This represents a potentially important evolution in thinking about agent architecture.

**Permission and Access Control**: The emphasis on permission-scoped context delivery reflects real-world enterprise requirements where agents must respect organizational access policies, not just have technical connectivity to data sources.

**Evaluation Challenges**: The case study implicitly highlights evaluation challenges in agent systems—the incorrect recommendation was well-reasoned and appeared correct without access to broader organizational context. Traditional evaluation metrics might not catch these failures.

However, several aspects warrant critical consideration. The presentation comes from a company selling a context engine product, so claims about necessity and effectiveness should be evaluated independently. The specific failure case shown is compelling but represents a single example; broader validation across diverse scenarios and organizations would strengthen the argument. The comparison with MCP may somewhat oversimplify—MCP implementations could potentially include ranking, reconciliation, and synthesis layers, though Unblocked argues this leaves too much to ad hoc agent-level decisions.

The scalability and maintenance burden of building and maintaining organizational models across constantly evolving codebases, conversations, and documentation represents a significant engineering challenge that the presentation doesn't deeply explore. There are also questions about latency implications—synthesizing context from multiple sources adds computational steps that could impact agent response times, particularly important for the performance-sensitive scenarios described.

The architecture raises interesting questions about the balance between agent autonomy and prescribed context. Providing synthesized understanding rather than raw documents makes agents more reliable but potentially less flexible in their reasoning. There may be scenarios where agents benefit from examining raw, contradictory information to make nuanced judgments.

## Technical Architecture Considerations

The case study suggests a multi-tiered architecture where frameworks like Flu handle agent orchestration, cloud platforms like Cloudflare provide execution environments and state management, and the context engine provides a separate layer for organizational knowledge synthesis. This separation of concerns aligns with good architectural practice but increases system complexity and introduces additional integration points.

The demonstration shows the context engine being called explicitly during agent execution, suggesting a pull-based model where agents request context as needed. This contrasts with approaches that might pre-populate agent context or use continuous monitoring to update agent knowledge bases proactively.

The emphasis on synthesized understanding delivered to agents suggests significant backend processing—the context engine must not only retrieve relevant documents but reason over them to extract salient points, resolve conflicts, and produce coherent summaries. This likely involves its own LLM-based processing pipeline, raising questions about cost, latency, and reliability of the context engine itself.

## Conclusion

This case study effectively illustrates a critical gap in current agent deployment practices: while infrastructure for running agents has matured dramatically, systematic handling of organizational context has not kept pace. The demonstrated failure mode—confidently wrong recommendations due to missing context—represents a real risk for production agent systems, particularly as deployment becomes easier and human oversight decreases.

The proposed context engine architecture offers a coherent approach to addressing this gap, though organizations evaluating this approach should consider the tradeoffs between integrated context management and agent autonomy, the operational complexity of maintaining organizational models, and the specific reliability and performance characteristics of context synthesis systems. The case study makes a compelling argument that context management deserves recognition as a fundamental infrastructure concern for production LLM systems, alongside established concerns like state management, observability, and security.
