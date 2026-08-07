---
title: "Context Engineering for Production SRE Agents"
slug: "context-engineering-for-production-sre-agents"
draft: false
llmopsTags:
  - "code-interpretation"
  - "data-analysis"
  - "high-stakes-application"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "token-optimization"
  - "latency-optimization"
  - "error-handling"
  - "kubernetes"
  - "orchestration"
  - "monitoring"
  - "microsoft-azure"
  - "anthropic"
industryTags: "tech"
company: "Microsoft"
summary: "Microsoft built an Azure SRE Agent to autonomously handle cloud infrastructure and production incidents, initially starting with 100+ narrow tools and 50+ specialized agents organized in a multi-agent architecture. This approach proved brittle and unreliable in production, with coordination failures, infinite loops, and poor generalization. The team pivoted to a context engineering approach, consolidating to just 5 core tools (primarily wide CLI-based tools like 'az' and 'kubectl'), reducing to a handful of generalist agents, and implementing sophisticated context management techniques including code interpreters for computation, progressive disclosure through file-based systems, aggressive context compaction, and planned tool call chaining. This shift from constraint-based design to capability-focused context management resulted in dramatically improved reliability and the ability to handle unanticipated scenarios that were impossible with the original architecture."
link: "https://techcommunity.microsoft.com/blog/appsonazureblog/context-engineering-lessons-from-building-azure-sre-agent/4481200"
year: 2025
seo:
  title: "Microsoft: Context Engineering for Production SRE Agents - ZenML LLMOps Database"
  description: "Microsoft built an Azure SRE Agent to autonomously handle cloud infrastructure and production incidents, initially starting with 100+ narrow tools and 50+ specialized agents organized in a multi-agent architecture. This approach proved brittle and unreliable in production, with coordination failures, infinite loops, and poor generalization. The team pivoted to a context engineering approach, consolidating to just 5 core tools (primarily wide CLI-based tools like 'az' and 'kubectl'), reducing to a handful of generalist agents, and implementing sophisticated context management techniques including code interpreters for computation, progressive disclosure through file-based systems, aggressive context compaction, and planned tool call chaining. This shift from constraint-based design to capability-focused context management resulted in dramatically improved reliability and the ability to handle unanticipated scenarios that were impossible with the original architecture."
  canonical: "https://www.zenml.io/llmops-database/context-engineering-for-production-sre-agents"
  ogTitle: "Microsoft: Context Engineering for Production SRE Agents - ZenML LLMOps Database"
  ogDescription: "Microsoft built an Azure SRE Agent to autonomously handle cloud infrastructure and production incidents, initially starting with 100+ narrow tools and 50+ specialized agents organized in a multi-agent architecture. This approach proved brittle and unreliable in production, with coordination failures, infinite loops, and poor generalization. The team pivoted to a context engineering approach, consolidating to just 5 core tools (primarily wide CLI-based tools like 'az' and 'kubectl'), reducing to a handful of generalist agents, and implementing sophisticated context management techniques including code interpreters for computation, progressive disclosure through file-based systems, aggressive context compaction, and planned tool call chaining. This shift from constraint-based design to capability-focused context management resulted in dramatically improved reliability and the ability to handle unanticipated scenarios that were impossible with the original architecture."
notion:
  pageId: "3b5f8dff-2538-8080-9a61-c38d3d97d164"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T13:15:00.000Z"
  lastEditedTime: "2026-08-07T13:16:00.000Z"
  publishedAt: "2026-08-07T13:23:08Z"
---

## Overview

Microsoft's development of the Azure SRE Agent represents a significant production deployment focused on autonomous cloud infrastructure management and incident response. The case study chronicles a six-month journey that started in mid-2025 and extended into early 2026, revealing critical lessons about deploying LLM-based agents in high-stakes production environments. The team's core insight was that success in production came not from model upgrades or prompt refinement alone, but from what they term "context engineering" - the disciplined management of what information enters the model's context, when it enters, and in what form. This case study is particularly valuable because it documents actual production failures and the architectural pivots required to achieve reliability.

## Initial Architecture and Its Failures

The team began with a common pattern: constrained tools and prescriptive prompts designed to limit the model's behavior out of distrust for production reliability. Given Azure's sprawling ecosystem of hundreds of services, each with distinct APIs and operational characteristics, they quickly accumulated over 100 specialized tools. Every new edge case prompted a new tool, every tool misuse led to additional guardrails, and restrictive guardrails spawned exceptions. This created a vicious cycle where the backlog grew faster than the team could address it.

The fundamental problem was that this approach didn't produce an agent capable of reasoning - it produced a brittle workflow system with an LLM grafted on top. The agent performed adequately on pre-encoded scenarios but failed catastrophically on anything outside its narrow training envelope. The team's first major insight was recognizing that insufficient trust in the model's reasoning capabilities drives teams toward building constrained workflows rather than true agents. This observation has broader implications for the field: overly defensive architectures may feel safer initially but ultimately limit the value proposition of LLM-based systems.

## The Wide Tools Breakthrough

The first genuine breakthrough came from inverting the tool design philosophy. Instead of 100+ narrow, purpose-built tools, the team introduced just two wide tools: the Azure CLI ('az') and Kubernetes CLI ('kubectl'). These weren't traditional API wrappers but rather full command-line ecosystem access points. From the model's perspective, this meant three tools (including one additional generic tool) instead of hundreds.

The impact was transformative across multiple dimensions. First, it achieved massive context compression by recovering headroom previously consumed by tool definitions. Second, it dramatically expanded capabilities because the model now had access to the entire surface area of these CLI tools rather than just the subset the team had explicitly wrapped. Third, and perhaps most importantly, reasoning quality improved because LLMs already possess knowledge of these standard CLIs from their training data. The team's custom abstractions had been fighting against the model's existing knowledge rather than leveraging it.

This pattern worked particularly well because CLIs are self-describing (through --help flags and consistent subcommand structures) and produce high-signal output and error messages. This creates a tight feedback loop where the model can run a command, read the result, and adjust its approach. The lesson here challenges a common assumption in LLMOps: sometimes the best tool design is no design at all, simply providing access to well-established interfaces that align with the model's training distribution.

## Multi-Agent Architecture: Elegant Theory, Messy Reality

Emboldened by the success of generic tools, the team built a full multi-agent system with explicit handoffs between specialized sub-agents. The architecture mirrored human organizational structures, with each sub-agent owning one Azure service and transferring control (along with context and intermediate results) when investigations crossed domain boundaries. The theoretical benefit was lazy tool loading: the orchestrator would know about sub-agents but not individual tools, routing questions to the appropriate specialist who would load only their relevant tools, keeping context lean.

At small scale, this worked beautifully. However, as the system grew to 50+ sub-agents, the architecture collapsed under coordination overhead. The team observed a bimodal distribution in outcomes - when handoffs worked, everything worked perfectly; when they didn't, the agent became completely lost. Problems requiring more than four handoffs almost always failed, revealing a hard complexity ceiling.

Four specific failure patterns emerged from this architecture. First, discovery problems: each sub-agent only knew about directly callable sub-agents, so reasonable user questions would fail with "I don't know how to help" not because the capability didn't exist, but because the orchestrator couldn't discover that the right sub-agent existed three hops away in the graph. Second, system prompt fragility: each sub-agent carried its own system prompt, and a poorly tuned prompt in one agent would pollute the entire reasoning chain with conflicting instructions and confused intermediate outputs. One malfunctioning agent could drag down the whole interaction, and with 50+ sub-agents, this became a persistent problem.

Third, infinite loops emerged in worst-case scenarios where agents bounced work around without making progress. The orchestrator would call a sub-agent that would defer back to the orchestrator or another sub-agent, creating "you handle it / no, you handle it" cycles that burned tokens and latency while producing no user value. While hop limits and loop detection provided partial mitigation, they undermined the clean architectural principles that motivated the design. Fourth, tunnel vision: human experts have overlapping domain knowledge - a Kubernetes engineer understands enough networking to suspect route issues and enough storage to rule it out. This overlap enables intelligent handoffs. The agents had hard domain boundaries, either surrendering prematurely or developing tunnel vision, chasing symptoms in their domain while root causes sat elsewhere.

The team recognized this as the same overcorrection pattern they'd seen with narrow tools. With narrow tools, they'd constrained what the model could do and paid in coverage gaps. With domain-scoped agents, they'd constrained what it could explore and paid in coordination overhead. The solution was consolidating dozens of specialists into a small set of generalist agents, which was only feasible because they'd already established generic tools. They moved domain knowledge from system prompts into files that agents could read on demand, later evolving this into an agent skills capability inspired by Anthropic's approach.

## Real-World Validation: The Self-Debugging Incident

A compelling validation came when Microsoft's own Azure OpenAI infrastructure deployment began failing. The team asked the SRE agent to debug it, and without any predefined workflow, the agent checked deployment logs, identified a quota error, queried subscription limits, found the correct support request category, and filed a ticket. The next morning, they had email confirmation of the quota increase. This scenario would have been impossible under the old architecture - there was no Cognitive Services sub-agent and no support request tool. With wide tools and cross-domain knowledge, the model navigated Azure's surface area the way a human engineer would, demonstrating true capability expansion beyond anticipated scenarios.

## Context Management Techniques

After consolidating tools and agents, the team focused on sophisticated context management for long-running conversations. Their code interpreter implementation represents a particularly important pattern. Initially, they approached metrics analysis by dumping all metrics into the context window and asking the model to find anomalies. This was fundamentally backwards - taking deterministic, structured data and pushing it through a probabilistic system, asking an LLM to do what a Pandas one-liner could accomplish. They paid in tokens, latency, and accuracy (models struggle with zero-valued metrics).

Worse, the approach kind of worked - for short windows, for simple queries - just enough success to mask how fundamentally flawed it was. The fix involved letting the model write code instead. Rather than sending 50,000 tokens of metrics into context, they sent metrics to a code interpreter, let the model write Pandas/NumPy analysis code, executed it, and returned only results and analysis. Metrics analysis had been their biggest source of tool failures; after this change, failures dropped to zero. Additionally, eliminating the token tax allowed extending time ranges by an order of magnitude. The key insight: LLMs function as orchestrators deciding what computation to run, then actual code performs the computation.

The team also implemented two complementary patterns. A todo-style planner represents plans as explicit checklists outside the model's context, allowing the model to update plans rather than re-deriving workflows on every turn. Aggressive compaction continuously shrinks history into summaries and structured state (key incident facts), maintaining context as a small working set rather than an ever-growing log. Together, these patterns effectively "stretch" the usable context window by externalizing plans and compacting history.

## Progressive Disclosure and Session-Based Interception

With code interpretation working, the team hit a new wall: tool calls returning absurd amounts of data. A real example involved an internal App Service Control Plane log table with approximately 3,000 columns due to a telemetry bug. A single log entry expanded to over 200,000 tokens, immediately exhausting the context window and causing model failures.

Their solution was session-based interception with progressive disclosure. Tool calls that can return large payloads never go directly into context. Instead, they write as "files" into a sandboxed environment where data can be inspected ("what columns exist?"), filtered ("show only error-related columns"), analyzed via code ("find rows where latency > p99"), or summarized before entering the model's context. The model never sees the raw 200,000 tokens but rather a reference to a session and tools to interact with it. This transforms an unbounded context explosion into a bounded, interactive exploration, similar to patterns seen in coding agents. The principle: treat large tool outputs as data sources, not context.

## Tool Call Chaining: The Next Evolution

The team's next planned update involves tool call chaining, originating from solving Troubleshooting Guides (TSGs) as code. Many agent workflows are predictable sequences: "run this query, fetch these logs, slice this data, summarize the result." Currently, the model walks this path one tool at a time in a sequence of model → Tool A → model → Tool B → model → Tool C cycles. The alternative allows the model to write a small script chaining tools together, which the platform executes and returns consolidated results. Three roundtrips become one, dropping context overhead by 60-70%.

This approach also unlocks deterministic workflows inside probabilistic systems. Long-running operations requiring specific ordering can be encoded as scripts where the model decides what should happen and the script guarantees how it happens. Anthropic recently published a similar capability called programmatic tool calling, suggesting this pattern is emerging as best practice.

## Meta-Lessons and the Context Engineering Paradigm

The team's overarching insight is that they thought they were building an SRE agent but were actually building a context engineering system that happens to perform site reliability engineering. Better models proved to be table stakes, but what moved the needle was what they controlled: generalist capabilities and disciplined context management.

They adopt Andrej Karpathy's analogy: if context windows are the agent's "RAM," then context engineering is memory management - deciding what to load, what to compress, what to page out, and what to compute externally. As context fills up, model quality often degrades non-linearly through phenomena like "lost in the middle," instruction adherence failures, and general long-context degradation that appears well before hitting advertised limits. More tokens don't just cost latency; they quietly erode accuracy.

The team acknowledges their approach has been largely empirical - "try it, observe, watch it break, tighten the loop" - but the patterns that persist (wide tools, code execution, context compaction, tool chaining) are being independently rediscovered across other agent stacks. The throughline is simple: give the model fewer, cleaner choices and invest effort making the context small, structured, and easy to operate on.

## Critical Assessment

While this case study provides valuable production insights, several caveats warrant attention. First, the narrative is self-reported by Microsoft without independent validation of claims like "zero failures" post-code-interpreter implementation or 60-70% context reduction from tool chaining. Second, the team doesn't discuss failure modes of their current architecture - surely generalist agents with wide tools have their own edge cases and failure patterns that aren't addressed here. Third, there's limited discussion of evaluation methodology; how do they measure reliability improvements quantitatively beyond anecdotal examples?

The case also reflects Microsoft's specific context: an internal tool for Azure infrastructure with presumably high tolerance for iteration and direct access to users for feedback. These conditions may not transfer to other production scenarios with stricter uptime requirements or external customers. Additionally, while the team dismisses model upgrades as "table stakes," the architecture clearly depends on models with sufficient reasoning capability to use wide tools effectively - this may not work with less capable models.

Finally, the upcoming tool call chaining feature is described as future work, not validated in production, so its promised benefits remain speculative. Nevertheless, the case study's value lies in its honest documentation of architectural failures and the specific patterns that emerged from production pressures, providing a rare window into the messy reality of deploying LLM agents at scale in critical infrastructure contexts.
