---
title: "Building Alex: An Agent-First AI Engineering Assistant with Production-Grade LLMOps"
slug: "building-alex-an-agent-first-ai-engineering-assistant-with-production-grade-llmops"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-generation"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "memory"
  - "few-shot"
  - "error-handling"
  - "token-optimization"
  - "langchain"
  - "cicd"
  - "monitoring"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "anthropic"
industryTags: "tech"
company: "Alyx"
summary: "Arize built Alex, an AI engineering agent that handles complex workflows like tracing, evaluation, and playground interaction within their observability platform. The team encountered significant challenges with task completion, context management, testing non-deterministic behavior, and debugging in production. They solved these through enforced planning with structured to-do tools, a \"large JSON\" abstraction for handling massive datasets with small composable tools, production trace-based testing with LLM judges in CI/CD, and agent-driven debugging using observability telemetry exposed as skills. The result was a production-ready agent capable of handling unlimited data scale, maintaining focus across complex multi-step tasks, and self-improving through autonomous debugging loops."
link: "https://www.youtube.com/watch?v=cyzeZ52HX9c"
year: 2026
seo:
  title: "Alyx: Building Alex: An Agent-First AI Engineering Assistant with Production-Grade LLMOps - ZenML LLMOps Database"
  description: "Arize built Alex, an AI engineering agent that handles complex workflows like tracing, evaluation, and playground interaction within their observability platform. The team encountered significant challenges with task completion, context management, testing non-deterministic behavior, and debugging in production. They solved these through enforced planning with structured to-do tools, a \"large JSON\" abstraction for handling massive datasets with small composable tools, production trace-based testing with LLM judges in CI/CD, and agent-driven debugging using observability telemetry exposed as skills. The result was a production-ready agent capable of handling unlimited data scale, maintaining focus across complex multi-step tasks, and self-improving through autonomous debugging loops."
  canonical: "https://www.zenml.io/llmops-database/building-alex-an-agent-first-ai-engineering-assistant-with-production-grade-llmops"
  ogTitle: "Alyx: Building Alex: An Agent-First AI Engineering Assistant with Production-Grade LLMOps - ZenML LLMOps Database"
  ogDescription: "Arize built Alex, an AI engineering agent that handles complex workflows like tracing, evaluation, and playground interaction within their observability platform. The team encountered significant challenges with task completion, context management, testing non-deterministic behavior, and debugging in production. They solved these through enforced planning with structured to-do tools, a \"large JSON\" abstraction for handling massive datasets with small composable tools, production trace-based testing with LLM judges in CI/CD, and agent-driven debugging using observability telemetry exposed as skills. The result was a production-ready agent capable of handling unlimited data scale, maintaining focus across complex multi-step tasks, and self-improving through autonomous debugging loops."
notion:
  pageId: "373f8dff-2538-8048-a26b-eebf3ddc1bc7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:22:00.000Z"
  lastEditedTime: "2026-06-02T07:22:00.000Z"
  publishedAt: "2026-06-02T07:35:19Z"
---

## Overview

Arize, an AI observability platform company, undertook a complete transformation of their product to become agent-first, building an AI engineering agent called Alex. This case study provides a detailed exploration of the practical challenges encountered when building and deploying a production agent, along with the architectural patterns and LLMOps practices developed to address them. The presentation comes from Aparna, one of Arize's founders who leads the product team, and focuses on four major lessons learned while bringing Alex from concept to production: staying on task through structured planning, managing context at scale, crystallizing good behavior through production-based testing, and enabling autonomous debugging through observability.

Alex serves as an AI engineering agent harness with deep context about user traces, evaluations, and sessions. It can help users trace their agents, navigate playgrounds, build evaluators, and perform various AI engineering workflows. The agent is built with an underlying harness that includes planning capabilities, tool calls, skills, and persistent memory across sessions. What makes this case study particularly valuable is that Arize builds tools to help others build AI systems, so they applied their own product philosophy to building Alex and discovered numerous insights that both validated and challenged their assumptions.

## Lesson 1: Staying on Task Through Enforced Planning

One of the first major challenges the team encountered was agent drift—asking the agent to complete three tasks would result in it completing the first one and then wandering off or prematurely finishing. In their first version, they included a "finish" tool that the agent would call before actually completing all assigned tasks. In one particularly problematic session, a user question triggered 27 different tool calls, and the agent executed all of them but never returned to actually answer the user's question, instead going in circles.

The root cause wasn't hallucination or capability limitations—it was an attention problem. When the context window filled up with intermediate data from all those tool calls, the original user question got buried under pages of output. By the time the agent had gathered enough information to proceed, it had forgotten what it was supposed to do next. This is a fundamental challenge in agent architectures: the very act of gathering context can obscure the original intent.

The solution was to make planning a first-class architectural component rather than a polite suggestion in the prompt. The team implemented planning as mandatory tool calls, not as prompt-based guidance. They built three separate to-do tools: to-do write (creates the plan), to-do update (changes task status), and to-do read (fetches current state). Each task has explicit states: pending, completed, blocked, and critically, in-progress.

The in-progress state turned out to be essential and was added later after they discovered that with only pending and completed states, the agent lacked a working pointer—it couldn't differentiate between tasks it hadn't started and tasks it was actively working on. The in-progress state provided a concrete anchor for complex tasks that take multiple turns to complete, giving the agent clarity about what it's currently doing and what can wait.

A critical architectural decision was that the plan lives outside the conversation history entirely. Rather than storing the to-do list in the conversation where it could get buried or truncated by tool outputs, the plan is stored separately and dynamically reinjected into the context window on every single LLM call. The plan appears right after the system prompt and before the noisy tool call history, ensuring it remains visible regardless of how deep into a workflow the agent gets.

The team also implemented what they call a "finish gate"—when the agent tries to call the finish tool but hasn't completed all tasks on the to-do list, the system throws an actual structured error (not just a prompt suggestion) that lists incomplete tasks and bounces the agent back into the work loop. The to-do list lives on disk outside the context, so even if the agent tries to finish early, the system architecture won't permit it. The only exception is the blocked status, which pauses work when a human intervenes to add context, at which point the plan is restored with the new context injected.

The broader lesson here is that at the current state of LLM capabilities, rules and constraints need to be enforced in code, not just suggested in prompts. Prompts function more as suggestions, but real constraints must be architectural. The team also found that few-shot examples showing what good planning looks like were more effective than simply telling the agent what to do.

## Lesson 2: Context Management at Scale

The second major challenge involved managing context when dealing with large datasets. Users of Arize's platform store millions of spans and hundreds of experiments, and the team initially tried to handle context limitations with band-aids—like limiting the agent to comparing only two experiments at a time. But this approach was essentially giving up rather than solving the underlying problem.

The team drew inspiration from how Cursor and Claude Code navigate large codebases: they don't dump entire files into context but instead read previews, use grep to find what they need, and read specific lines. The file lives on disk while the agent holds a reference to it. Arize needed a similar pattern for handling large data.

They built an abstraction called "large JSON." When a tool returns a large dataset, Alex doesn't put all of it in context. Instead, it stores the full data server-side in memory and gives the LLM a preview plus an ID for retrieving the data. This functions like a filename that can be pulled from disk when needed.

The naive approach of just taking the first N lines or first N tokens proved inadequate because it showed the agent only a few complete rows with no understanding of the overall data structure. The solution was to compress values but not structure. The system walks through the entire JSON tree and truncates every value inside each cell to 100 characters maximum, meaning every field, key, and array element appears in the preview (except for very long strings), but the agent sees the full shape of the entire data. This structural awareness is essential for writing useful queries.

The team empowered Alex with small, composable tools—specifically jq (the same command-line tool) and grep JSON (regex search over serialized data). The agent can write jq expressions to slice, filter, aggregate, and transform data. They also implemented a hard budget where no tool call output can exceed 10,000 characters, meaning that regardless of the size of underlying data, each query costs a predictable amount of context. If more information is needed, the agent simply makes additional queries across extra turns.

This approach reflects an old but powerful software engineering principle: small composable tools that do one thing really well and can be composed together. Each tool accepts input, produces output, and can chain with others. This architecture eliminated the context overflow problem entirely—where previously the agent struggled to handle more than two experiments, it can now handle hundreds with no limitation.

The team also learned to use recoverable exceptions to create feedback loops. When tool calls failed due to context overflow, they built mechanisms for the agent to learn to query progressively smaller pieces of data until it stayed within context limits.

## Lesson 3: Crystallizing Good Behavior Through Production-Based Testing

Testing non-deterministic systems presents a fundamental challenge for traditional software engineering practices. Deterministic tests assert X input produces Y output, but agents break this model—the same prompt can produce different responses across runs, and multiple different responses may all be correct. You can't assert exact text matches, and even asserting on tool call sequences is problematic since an extra tool call might still lead to the correct answer.

The team started, like everyone, with "vibe checking"—watching Alex, eyeballing outputs, asking "does this look right?" and then shipping. This doesn't scale, doesn't run in CI, and led to dropped responses and failures handling large data inputs. The key insight was: don't write expected outputs by hand—let production tell you what good looks like.

When a user has a successful session where Alex does the right thing, they capture that entire session as a golden example. Those production traces contain everything: what the LLM did, what tool calls were made, in what order. These real traces became ground truth, not hand-crafted expectations.

They built two levels of testing. First, decision point tests—pytest-based tests that validate specific agent decisions. They build up message history to a decision point, run the actual orchestrator, and assert that output is correct with some flexibility (e.g., 2 seconds vs 2000 milliseconds are treated as equivalent). These tests are as deterministic as possible and work well for code-based validation.

Second, trajectory-level tests measure whether the agent accomplished the task. They extract entire sessions from production traces and replay them span-by-span against the orchestrator. The output is scored using an LLM judge that evaluates whether the agent reached the same outcome, triggered the right next steps, or took a different but valid path. The evaluation prompt needs to be flexible enough to handle nuances—for example, when they renamed a tool call from "get trace preview" to "get traces," the agent tried calling a function that didn't exist, creating a runtime failure that would be invisible with stubbed data.

They integrated this testing into CI/CD, so any change to the agent—prompts, tool calls, anything—triggers experiments that run live. Claude Code review runs on every PR with validation rules, meaning prompt changes are vetted using natural language to validate natural language. This allowed Arize to dogfood their own evaluation platform, giving them confidence that their approach works for production agents.

Key lessons include: build infrastructure to capture traces and golden sessions early, run tests against real APIs rather than mocks, and use production data as the source of truth for what good behavior looks like.

## Lesson 4: Debugging Through Agent-Driven Observability

Once deployed, something inevitably goes wrong. Manual debugging of an LLM in production is extremely difficult—data is spread across Arize for agent perspective, DataDog for server perspective (latencies, errors, HTTP status), and GCP logs for infrastructure perspective (gRPC errors that never became spans). Debugging requires correlating information across these systems, which is tedious and time-consuming.

The key realization is that debugging an agent is itself an agent-shaped problem. LLMs are very good at sifting through traces, correlating IDs and timestamps, and following procedures to narrow down root causes. This insight connects to a broader thesis about the evolution of software development across three phases.

In Phase 1 (Software 1.0), a human writes code in an IDE, the application runs and emits telemetry, the human reads dashboards and logs, and the human decides what's broken and deploys a fix. In Phase 2 (current state for many teams), the human prompts a coding agent in Cursor or Claude Code, the agent writes code, but the human still reads observability data, identifies bugs, and directs the agent to fix code. In Phase 3 (the emerging paradigm), the process becomes autonomous—the agent has direct access to observability platforms, queries traces, accesses telemetry, implements changes, and simply notifies the human who monitors the system.

This shift has profound implications for observability platforms, which were historically built for humans with dashboards and visualizations. When the primary consumer is an agent, the paradigm breaks down—agents don't care about charts or pretty visualizations. They care about structured data and CLI interfaces. The interface layer must evolve.

There's also a fundamental shift in source of truth. As Harrison Chase from LangChain noted, in traditional software you can read every line of code and see every possible execution path. But agents are non-deterministic—you can't know what an agent will do just from reading code. Everything that actually happens is logged in traces. This means a coding agent can't just examine code to understand behavior; it needs access to runtime traces to see what's actually happening, identify errors, detect tool call loops, and drive self-improvement.

Arize's solution was to give Alex access to all data in their platform—traces, evaluations running on production traces, and feedback—all accessible via CLI and exposed as skills. These skills serve as the bridge between the coding agent and the application being debugged. They use this internally where the coding agent uses trace data to identify issues, automatically propose fixes, and have a human review the fix.

The skills are available as an NPX package that can instrument agents, pull spans, surface summaries, and write evaluations. The vision is an AI engineering loop where the agent observes data, fetches traces and spans, hypothesizes about problems (based on traces, not guessing from code or console logs), designs and runs experiments that get automatically logged, measures outcomes, and ships improvements or iterates.

The team exposed skills across their full telemetry stack—Arize for agent perspective, DataDog for server perspective, and GCP for infrastructure perspective. The coding agent can investigate across all three, fetching telemetry data to debug issues. They've caught out-of-memory issues, bad prompts, and even problems unrelated to the agent. Tasks that might take an engineer 30 minutes now take the agent about 2 minutes.

Critical considerations include building skills that only perform safe operations, using wrapper scripts around powerful CLI calls, and implementing permission requests for operations requiring guardrails. The broader meta-lesson is to invest in observability infrastructure before you think you need it—it's incredibly cheap, provides visibility, and enables agent self-improvement.

## Cross-Cutting Themes and Production Insights

Two major themes emerged from building Alex. First, context engineering is everything—how context is handled, what's included, what's excluded, how data is structured and accessed. The team had to think deeply about what information the agent truly needs in context versus what can be retrieved on demand.

Second, the shift from deterministic to non-deterministic systems represents a fundamental change in software engineering practice. This is simultaneously weird and fun as a technical challenge, requiring new approaches to testing, debugging, and quality assurance. Traditional techniques built on determinism don't translate directly, necessitating new patterns like LLM judges, trajectory-based evaluation, and agent-driven debugging.

The four key takeaways synthesize to: plan so the agent doesn't lose sight of goals; provide just enough context while making more available through composable tools; crystallize successful behavior by capturing golden examples from production; and prepare for production issues by building observability and debugging tools from the start.

This case study is particularly valuable because Arize built observability and evaluation tools before building their own agent, giving them sophisticated infrastructure to understand Alex's behavior from day one. The self-referential nature—using their own platform to improve their own agent—provides validation that their LLMOps practices work for production systems. The lessons learned span the full lifecycle from initial development through testing, deployment, and ongoing improvement, offering a comprehensive view of what it takes to build and operate a production-grade AI agent.
