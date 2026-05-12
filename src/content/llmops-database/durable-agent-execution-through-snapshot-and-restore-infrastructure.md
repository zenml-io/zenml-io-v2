---
title: "Durable Agent Execution through Snapshot and Restore Infrastructure"
slug: "durable-agent-execution-through-snapshot-and-restore-infrastructure"
draft: false
llmopsTags:
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "harness-engineering"
  - "docker"
  - "kubernetes"
  - "microservices"
  - "serverless"
  - "orchestration"
  - "devops"
  - "scaling"
  - "open-source"
industryTags: "tech"
company: "Trigger.dev"
summary: "This case study explores the infrastructure challenges of deploying LLM-powered agents to production at scale, as presented by Trigger.dev. The company identified that traditional stateless compute architectures and replay-based workflow systems are insufficient for long-running agent sessions that can span hours or days. Their solution combines two key approaches: maintaining an append-only context log for conversational durability, and implementing VM-level snapshot and restore capabilities using Firecracker micro VMs. The result is a production system capable of handling millions of snapshot/restore operations with sub-second snapshot times and 200-millisecond restore times, achieving 15,000 VM starts per minute while reducing memory footprints from 512MB to 14MB through seekable compression."
link: "https://www.youtube.com/watch?v=svCnShDvgQg"
year: 2026
seo:
  title: "Trigger.dev: Durable Agent Execution through Snapshot and Restore Infrastructure - ZenML LLMOps Database"
  description: "This case study explores the infrastructure challenges of deploying LLM-powered agents to production at scale, as presented by Trigger.dev. The company identified that traditional stateless compute architectures and replay-based workflow systems are insufficient for long-running agent sessions that can span hours or days. Their solution combines two key approaches: maintaining an append-only context log for conversational durability, and implementing VM-level snapshot and restore capabilities using Firecracker micro VMs. The result is a production system capable of handling millions of snapshot/restore operations with sub-second snapshot times and 200-millisecond restore times, achieving 15,000 VM starts per minute while reducing memory footprints from 512MB to 14MB through seekable compression."
  canonical: "https://www.zenml.io/llmops-database/durable-agent-execution-through-snapshot-and-restore-infrastructure"
  ogTitle: "Trigger.dev: Durable Agent Execution through Snapshot and Restore Infrastructure - ZenML LLMOps Database"
  ogDescription: "This case study explores the infrastructure challenges of deploying LLM-powered agents to production at scale, as presented by Trigger.dev. The company identified that traditional stateless compute architectures and replay-based workflow systems are insufficient for long-running agent sessions that can span hours or days. Their solution combines two key approaches: maintaining an append-only context log for conversational durability, and implementing VM-level snapshot and restore capabilities using Firecracker micro VMs. The result is a production system capable of handling millions of snapshot/restore operations with sub-second snapshot times and 200-millisecond restore times, achieving 15,000 VM starts per minute while reducing memory footprints from 512MB to 14MB through seekable compression."
notion:
  pageId: "35df8dff-2538-80b5-89a0-e50db1d364e4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:32:00.000Z"
  lastEditedTime: "2026-05-11T20:32:00.000Z"
  publishedAt: "2026-05-11T20:41:22Z"
---

## Overview

Trigger.dev, a backend infrastructure company founded to simplify deploying production-grade systems, presents a fundamental rethinking of how LLM agents should be deployed and managed in production environments. The founders identified that the emergence of sophisticated agentic workflows has exposed critical limitations in traditional backend architecture paradigms that have dominated web development for three decades. This case study addresses the core challenge of making agents durable enough to perform meaningful, long-running work on production servers while maintaining cost efficiency and reliability.

The presentation argues that agents represent a paradigm shift in backend infrastructure requirements. Unlike traditional web applications that follow a request-response pattern, agents operate as long-running sessions that need to persist state across multiple turns of conversation, recover gracefully from failures, and maintain context over periods that could extend from hours to potentially days as agent capabilities continue to improve.

## Historical Context and Architecture Evolution

The presentation begins with a comprehensive history of backend architecture to contextualize the problem. Starting with CGI in 1993, which forked a new process for each HTTP request and wrote responses to standard output before terminating, the web evolved through the LAMP stack and PHP, which introduced process reuse but maintained the fundamental principle of statelessness. This "shared nothing architecture" became the dominant paradigm where compute layers remained stateless and all persistent state lived in databases. Every framework that followed, including Ruby on Rails, Node.js, and serverless architectures, adhered to this same pattern of request plus database equals response.

As applications grew more sophisticated, they began performing side effects outside the request-response lifecycle, such as sending emails, charging credit cards, or resizing images. These async tasks evolved into multi-step workflows that introduced complex failure scenarios. For instance, in a process order workflow that charges a credit card and then sends a receipt, if the receipt sending fails, simply retrying the entire workflow would charge the card twice, an unacceptable outcome.

To address this, workflow and durable execution engines emerged approximately 10 to 15 years ago, implementing what the presenter calls a "replay model." This approach wraps each side effect in a step that becomes cached as it executes, creating an execution history or audit trail. When resuming from a failure, the system skips already-completed steps and continues from the point of failure. This replay model builds durability on top of stateless compute architecture, allowing systems to wait for external events like human approvals and resume execution afterward.

However, the replay model has notable limitations. It requires rigid code structuring where everything outside of defined steps must be deterministic, and versioning the replay journal becomes complex when deploying new code versions. These constraints become particularly problematic when applied to modern agent architectures.

## The Agent Loop Challenge

When LLMs initially emerged in 2023, they fit neatly into the existing workflow paradigm as another step in a workflow, perhaps classifying text or performing other discrete tasks. However, the introduction of tool calling fundamentally changed the dynamic. With tool calling, the LLM itself became the orchestrator rather than being orchestrated by code. This created the "agent loop" where the LLM decides which tools to call and in what sequence, fundamentally inverting the control flow of traditional workflows.

Attempting to apply the replay model to agent loops reveals critical scalability issues. Each LLM call becomes a step in the replay journal, as does each tool call. After even a single turn with moderate activity, the replay log grows substantially. As users continue interacting with the agent, the log grows continuously. Eventually, systems hit fundamental limits, either in the number of journal entries or in the size of individual entries. This becomes especially problematic given that agent capabilities are improving rapidly, with the time agents can perform meaningful work reportedly doubling every 4 to 7 months. Current agents operate effectively for a few hours, but projections suggest multi-day agent sessions will soon be commonplace.

The core insight is that agents are not transactions but sessions. Multi-step workflows have defined start and end points, but agent sessions persist for as long as users need them. Applying transaction-oriented durability mechanisms to session-oriented workloads creates a fundamental mismatch.

## First-Principles Approach to Agent Durability

Trigger.dev's solution begins with a first-principles analysis of what components of an agent actually need durability. They conceptualize agents as having two distinct halves that require different durability strategies.

The first half is the context, comprising all system messages, user messages, tool calls, tool results, and assistant responses. This represents everything that has passed through the LLM and forms the conversational state. This context is extremely valuable and must be preserved, but it has relatively straightforward durability requirements since it is essentially an append-only log of interactions.

The second half is the execution layer. As agents grow more sophisticated and perform more complex work, they increasingly need machine-like capabilities similar to what they might have on a developer's laptop. They need to write files, maintain data in memory, spawn subprocesses, clone GitHub repositories, install packages, run development servers, or maintain sandbox environments. This execution state is fundamentally different from the context log and requires different durability mechanisms.

## Context Durability Solution

For context durability, Trigger.dev leverages the append-only log pattern. Everything that goes in and out of the LLM is recorded sequentially in a log that never modifies previous entries, only appends new ones. This log can be made durable using standard database technologies, object storage systems, or distributed file systems. Numerous specialized technologies have emerged specifically for this type of append-only conversational data.

The key benefits of this approach include durability across code versions. When upgrading the agent harness or framework, the context log remains valid and usable. If a machine crashes, the context is safely stored externally and can be retrieved to resume the conversation. Append-only logs also scale exceptionally well, as they avoid the complex versioning and replay challenges of traditional workflow systems.

## Execution Durability through Snapshot and Restore

The execution layer presents a more complex challenge. The substantial state that accumulates in the compute layer during agent operation, including cloned repositories, installed packages, in-memory datasets, running dev servers, or sandboxed subprocesses, cannot be effectively captured in a log format. Additionally, agents must wait for potentially long periods between user messages. Keeping machines running continuously during these idle periods would be prohibitively expensive.

Trigger.dev's solution is snapshot and restore at the machine level. Rather than recreating execution state from logs, they snapshot the entire machine state, shut down the machine, save the snapshot to disk, and restore it when the next user message arrives. This provides durability across conversation turns, allowing machines to be shut down while users are inactive, potentially for hours such as during lunch breaks, without losing any execution state.

The approach preserves everything the agent was doing, including all in-memory state, file system contents, and running processes. Compared to keeping machines running continuously, snapshot and restore is dramatically more cost-effective.

## Technical Implementation Evolution

The presentation traces Trigger.dev's technical evolution through several implementation approaches. Interestingly, the concept of checkpointing long-running processes is not new. An IBM mainframe from 1966 featured checkpoint and restore capabilities specifically because expensive computational jobs running for hours could not afford to restart from scratch after failures. Developers would manually insert checkpoints into their code.

In 2011, CRIU (Checkpoint/Restore In Userspace) was developed for Linux systems. This ingenious tool could suspend and restore processes from user space by injecting a "parasite" into the target process, forcing it to dump everything to memory, then removing all traces of the parasite to restore the process transparently. Trigger.dev shipped a CRIU-based solution in 2024 and performed millions of snapshot restores with this technology.

CRIU offered significant advantages including transparency to the process being checkpointed and compatibility with container runtimes. However, it had notable limitations. It could only checkpoint individual processes, so multi-process workloads like FFmpeg or Chrome browser instances would not be fully captured. It only captured open files, meaning file system state had to be actively open at snapshot time or it would be lost. Additionally, while container compatibility was beneficial, working with container registries for push and pull operations introduced significant performance overhead.

These limitations led Trigger.dev to adopt Firecracker micro VMs in 2025. Firecracker, originally developed by Amazon for AWS Lambda, enables extremely lightweight virtualization. This shift allowed Trigger.dev to snapshot entire machines rather than individual processes, capturing everything on the VM regardless of process boundaries or file states. Upon restore, the VM picks up exactly where it left off regardless of what was running.

## Optimization Challenges and Solutions

Initial naive implementations of VM snapshotting proved expensive. With a default machine size of 512 megabytes, each snapshot would consume 512 megabytes of storage. For systems performing millions of snapshots, this creates enormous costs in both network transfer and storage, particularly problematic given that much of the allocated memory typically goes unused.

The breakthrough came through compression, specifically seekable compression. Rather than compressing the entire snapshot as a monolithic block, seekable compression allows decompression of specific memory pages on demand. During restore operations, Trigger.dev captures which memory pages are actually needed and decompresses only those specific portions just-in-time. Combined with layering techniques that avoid duplicating common base state across snapshots, they achieved compression ratios reducing snapshots from 512 megabytes to approximately 14 megabytes.

This compression ratio is tunable, allowing operators to balance between snapshot size and restore performance based on their specific requirements. The compression and decompression overhead is minimal compared to the savings in network transfer and storage costs.

## Performance Characteristics

The optimized system achieves impressive performance metrics. Snapshot operations complete in slightly under one second, while restore operations take only a couple hundred milliseconds. These times are dramatically faster than the previous CRIU-based approach, though the presentation notes the comparison is somewhat unfair given the architectural differences.

The system achieves approximately 15,000 VM starts per minute in benchmark testing. The presenter humorously notes this means time to interactive (TTI) is fast enough to theoretically render video at approximately 30 frames per second, illustrating the extreme performance level achieved.

## Open Source Tooling

Trigger.dev has bundled their implementation into a tool called FC Run (or F Crun, with pronunciation apparently disputed internally), planned for open source release. This provides a Docker-like CLI that serves as a drop-in replacement for Docker commands, but runs containers inside Firecracker VMs with snapshotting and restoring capabilities.

Examples demonstrate running Alpine Linux with extremely fast startup, snapshotting running VMs nearly instantaneously, and forking VMs with minimal overhead. This tooling enables other organizations to implement similar durable agent architectures without rebuilding the entire infrastructure stack.

## Error Recovery Strategies

The combined approach of context logs and execution snapshots enables sophisticated error recovery strategies tailored to different failure modes. If the LLM service itself experiences issues, such as rate limiting that requires waiting 15 minutes before retrying, the system snapshots the machine and restores it when retry is appropriate, avoiding expensive idle time in memory. If the machine itself crashes or encounters bugs in deployed code, the context log remains intact and can be used to recover conversational state, potentially on a different machine or after deploying fixed code.

## Architectural Philosophy and Future Direction

The presentation concludes with a bold architectural thesis: for 30 years, stateless compute has been the foundation of backend infrastructure, but agents are forcing a fundamental shift toward stateful compute. At the heart of this transformation must be snapshot and restore capabilities at the infrastructure level.

This represents a genuine paradigm shift rather than incremental improvement. The shared-nothing architecture that enabled horizontal scaling of web applications is fundamentally mismatched to the requirements of long-running agent sessions. While stateless compute simplified operations and enabled enormous scale through simple replication, stateful compute with proper snapshot and restore mechanisms enables entirely new classes of applications that maintain rich state over extended periods.

## Critical Assessment

While the technical implementation is impressive and the architectural analysis is compelling, several considerations warrant attention. The case study primarily presents Trigger.dev's own perspective on the problem and solution without extensive validation from independent users or comparative analysis with alternative approaches. The claim that replay-based systems inevitably hit scalability limits with agent workloads may be true for certain implementations but might not apply universally to all workflow engine designs.

The snapshot and restore approach introduces its own complexity and potential failure modes. What happens if snapshot storage becomes unavailable? How is consistency maintained if multiple restore operations occur simultaneously? The presentation does not address these operational concerns in detail. Additionally, while the compression ratios achieved are impressive, the specific characteristics of agent workloads that enable such compression may not generalize to all use cases.

The cost comparison between continuous machine operation and snapshot/restore is presented as obviously favorable, but without specific numbers it is difficult to assess the true economics. Snapshot storage costs, network transfer costs, and the computational overhead of compression and decompression all factor into the total cost of ownership.

The open source promise of FC Run is noteworthy and will enable community validation of the approach. However, at the time of this presentation the tool was not yet released, so independent verification of performance claims and operational characteristics remains pending.

Despite these caveats, the core insight that agents require fundamentally different infrastructure patterns than traditional web applications or even workflow engines is valuable and likely correct. The historical perspective tracing backend architecture evolution provides useful context for understanding why existing systems struggle with agent workloads. The implementation appears technically sound and the performance characteristics, if validated independently, would represent significant advancement in production agent infrastructure.
