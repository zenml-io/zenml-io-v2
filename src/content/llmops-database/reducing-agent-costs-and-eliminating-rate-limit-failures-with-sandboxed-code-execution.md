---
title: "Reducing Agent Costs and Eliminating Rate-Limit Failures with Sandboxed Code Execution"
slug: "reducing-agent-costs-and-eliminating-rate-limit-failures-with-sandboxed-code-execution"
draft: false
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "structured-output"
  - "agent-based"
  - "cost-optimization"
  - "latency-optimization"
  - "token-optimization"
  - "error-handling"
  - "multi-agent-systems"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "docker"
  - "monitoring"
  - "cicd"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "openai"
  - "cloudflare"
industryTags: "tech"
company: "Port of Context"
summary: "Port of Context needed a GTM intelligence agent that could search multiple terms across data-intensive sources like GitHub and Hacker News in real time without hitting rate limits or excessive costs. They built an agent using goose (an open-source agent harness), MCP servers for tool access, and Arcade.dev for runtime management, then tested two execution modes: the standard tool-use loop versus Code Mode (a sandboxed TypeScript execution path they contributed to goose). Code Mode delivered 100% reliability versus 56% with the standard approach, cut per-run costs roughly in half ($0.20 vs $0.41), and reduced input tokens by approximately 3x (31.8k vs 93.6k) by keeping tool result payloads inside the sandbox rather than passing them back through the model's context window on every turn."
link: "https://aaif.io/blog/how-port-of-context-eliminated-production-agent-failures/"
year: 2026
seo:
  title: "Port of Context: Reducing Agent Costs and Eliminating Rate-Limit Failures with Sandboxed Code Execution - ZenML LLMOps Database"
  description: "Port of Context needed a GTM intelligence agent that could search multiple terms across data-intensive sources like GitHub and Hacker News in real time without hitting rate limits or excessive costs. They built an agent using goose (an open-source agent harness), MCP servers for tool access, and Arcade.dev for runtime management, then tested two execution modes: the standard tool-use loop versus Code Mode (a sandboxed TypeScript execution path they contributed to goose). Code Mode delivered 100% reliability versus 56% with the standard approach, cut per-run costs roughly in half ($0.20 vs $0.41), and reduced input tokens by approximately 3x (31.8k vs 93.6k) by keeping tool result payloads inside the sandbox rather than passing them back through the model's context window on every turn."
  canonical: "https://www.zenml.io/llmops-database/reducing-agent-costs-and-eliminating-rate-limit-failures-with-sandboxed-code-execution"
  ogTitle: "Port of Context: Reducing Agent Costs and Eliminating Rate-Limit Failures with Sandboxed Code Execution - ZenML LLMOps Database"
  ogDescription: "Port of Context needed a GTM intelligence agent that could search multiple terms across data-intensive sources like GitHub and Hacker News in real time without hitting rate limits or excessive costs. They built an agent using goose (an open-source agent harness), MCP servers for tool access, and Arcade.dev for runtime management, then tested two execution modes: the standard tool-use loop versus Code Mode (a sandboxed TypeScript execution path they contributed to goose). Code Mode delivered 100% reliability versus 56% with the standard approach, cut per-run costs roughly in half ($0.20 vs $0.41), and reduced input tokens by approximately 3x (31.8k vs 93.6k) by keeping tool result payloads inside the sandbox rather than passing them back through the model's context window on every turn."
notion:
  pageId: "37cf8dff-2538-8043-9f90-fd361e38af3b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T11:35:00.000Z"
  lastEditedTime: "2026-06-11T11:35:00.000Z"
  publishedAt: "2026-06-11T12:13:15Z"
---

## Overview

Port of Context builds context engineering and execution infrastructure for production agentic AI systems. In this case study, they detail how they built and optimized a GTM (go-to-market) intelligence agent designed to search GitHub issues, pull requests, repositories, and Hacker News threads for specific keyword mentions to surface outreach opportunities, positioning insights, and content ideas. The central technical question they investigated was whether their Code Mode execution approach—a sandboxed TypeScript environment they contributed to the goose agent harness—would deliver better reliability and cost-efficiency compared to the standard tool-use loop pattern used in most LLM agent frameworks.

The case study is particularly valuable from an LLMOps perspective because it demonstrates rigorous production testing across multiple models (Anthropic's Sonnet 4-5 and Opus 4-6, plus OpenAI's GPT-5-4), provides concrete cost and token metrics, and compares two fundamentally different architectural approaches to agent execution with real production workloads.

## The Production Use Case

The GTM agent needed to perform scheduled, multi-source searches across data-heavy APIs. The specific requirements included searching for specific key terms (not broad keywords) to maintain precision, running multiple searches daily on a schedule without failures, and delivering structured digests to a Slack channel for quick team consumption. These requirements created a challenging workload profile: multiple API calls per run, large JSON payloads returning from each search, and the need to aggregate results before posting to Slack—all while staying within API rate limits and keeping costs manageable.

## Architecture and Technology Stack

The production system was built on three main components working together. First, they created a custom MCP (Model Context Protocol) server called "gtmdata" that exposed five tools the agent could invoke: searching GitHub issues, pull requests, and repositories; searching Hacker News; and posting messages to Slack. This MCP server approach provided a clean abstraction layer between the agent and the underlying APIs.

Second, they used Arcade.dev as the MCP runtime, which provided typed and reliable tools, managed authorization flows, and enforced policies through per-request OAuth primitives. The authorization handling was particularly notable because Arcade.dev managed GitHub and Slack OAuth scopes without the team needing to write token management code. This abstraction meant the same controls governed every agent regardless of which model was being used.

Third, they used goose, an open-source agent harness from the AI Alliance for Infrastructure (AAIF), which handled taking user prompts and dispatching tool calls. Goose offers two distinct execution modes, which became the center of their investigation.

## The Two Execution Modes Compared

The standard tool-use loop that most LLM agent frameworks implement works as follows: the agent issues one tool call at a time, receives the JSON result back into the model's context as a message, reasons about that result in natural language, and then decides on the next call. This pattern repeats for each tool invocation. The critical characteristic is that every tool result enters the conversation context and remains there for subsequent inference calls.

Code Mode, by contrast, takes a fundamentally different approach. The agent writes a small TypeScript program that calls MCP tools as typed function calls inside a sandboxed Deno environment. The tools execute (often in parallel using Promise.all patterns), and only the final aggregated result returns to the conversation. The intermediate tool result payloads—which can be quite large—stay inside the sandbox and never enter the model's context window.

This architectural difference has profound implications for token consumption and API rate limiting. In the standard mode, when the agent searches GitHub Issues (returning perhaps 20-30 KB of JSON), then GitHub PRs (another 20-30 KB), then repositories, then Hacker News, each of those payloads enters the context. By the time the agent is ready to compile the digest and post to Slack, the next inference call carries all four payloads in its input context. This is where the token explosion happens and where rate limits become unavoidable.

## Experimental Design and Methodology

The team conducted a controlled experiment to validate their hypothesis that Code Mode would be more reliable and token-efficient. They used the same prompt across all runs: "Use gtm agent to look up all mentions of the specific term 'code mode' across sources over the past 7 days and send a digest to the slack channel." They tested three models (Sonnet 4-5, Opus 4-6, and GPT-5-4) with six runs per model—three with Code Mode enabled and three with it disabled. Each run started with a fresh goose session to ensure consistency. Everything else in the architecture remained constant: the MCP server, the upstream APIs, the Slack channel, and the infrastructure.

## Production Results and Performance Metrics

The results revealed stark differences between the two execution modes. Code Mode achieved 100% delivery success across all runs, while the standard mode only succeeded 56% of the time. Every single rate-limit failure in the experiment occurred in standard mode. The cost difference was approximately 2x: Code Mode runs averaged $0.20 per execution versus $0.41 for standard mode. The cheapest correct result in the entire dataset was $0.056, achieved with Code Mode enabled.

Token consumption told an even more dramatic story. Code Mode runs averaged 31.8k input tokens while standard mode consumed 93.6k input tokens—roughly 3x more. This difference directly explained both the cost gap and the rate-limit failures. When tool result payloads stay inside the sandbox, they never inflate the context window. When they enter as messages in the standard loop, they accumulate across turns until rate limits are exceeded.

## Root Cause Analysis of the Performance Gap

The technical explanation for these differences lies in how data flows through the system. In a typical Code Mode run, the agent writes a TypeScript program that batches all MCP calls into a single Promise.all block and chains the result directly into a Slack post. The agent can read fields like `result.total_count` as typed properties rather than parsing them from JSON-as-message blobs. Four search payloads totaling over 100k tokens are consumed by the sandbox and never reach the model's context. The entire execution collapses into a short reasoning trace, a single `execute_typescript` call, and a Slack post.

In standard mode, the same logical task unfolds as an iterative back-and-forth loop. Each search returns its 15-30 KB JSON payload into the model's context as a new message. By the final turn when the model is compiling the digest, it's reasoning over all four search payloads simultaneously, and all prior tool results are carried forward in the input context. This is the structural source of the 3x token gap and why rate-limit failures become inevitable rather than exceptional.

The claim being made is that Code Mode doesn't change what the agent does—it changes where the data lives during execution. While this is largely accurate, it's worth noting that there are subtle behavioral differences. The TypeScript program must be written correctly upfront, whereas the iterative loop allows for course correction between tool calls. The tradeoff is between upfront correctness requirements and incremental token accumulation.

## Multi-Model Observations and Failure Modes

An important secondary finding emerged from testing across three different model families. Each model exhibited distinct failure patterns on the identical prompt, revealing that model choice matters significantly in production agent deployments.

Sonnet 4-5 consistently failed to understand the phrase-search intent. In every delivery, it passed "code mode" to the GitHub Search API without quotes, causing the API to AND the two words separately rather than searching for the exact phrase. This returned approximately 25,000 issues instead of the few thousand containing "code mode" as a phrase. Critically, Sonnet reported these inflated totals as if they were accurate, never flagging the discrepancy. One run even summed the four broad totals into a headline figure of 208,107 mentions—a completely spurious number.

Opus 4-6 demonstrated much better prompt comprehension and self-correction. It either escaped quotes properly to create phrase-quoted API calls from the start, or recognized noise in unfiltered results mid-execution and applied client-side phrase validation. The reasoning traces showed explicit statements like "Now I have all the data. Let me carefully review the results to find actual mentions of the specific term 'code mode' (as a distinct phrase, not just 'code' and 'mode' appearing separately)."

GPT-5-4 consistently sent correctly phrase-quoted queries to the API, demonstrating good initial understanding. However, two of three Code Mode runs suffered from a downstream framing bug: the agent reported the array length (50, which was the server's safe-limit cap) instead of the real total count field, leading to digests that claimed "Total Mentions: 122" when the actual count was around 4,640.

These observations are critical for production LLMOps because they demonstrate that the same prompt and architecture can produce completely different quality outcomes depending on model choice. Sonnet built confident but incorrect results from flawed inputs. Opus self-corrected mid-flight when detecting anomalies. GPT got the API interaction right but misinterpreted the response structure. This suggests that production agent deployments need model-specific validation and testing, not just architectural optimization.

## Code Mode Implementation Details and Ecosystem Context

The case study provides extensive technical detail about how Code Mode is implemented in the pctx (Port of Context) system and how it compares to similar approaches from other vendors. Four organizations have shipped Code Mode-style execution in recent years: Cloudflare (who coined the term and ships it on Dynamic Workers), Anthropic (Programmatic Tool Calling in the Claude API using Python in a Code Execution container), Pydantic AI (Monty, a deny-by-default Python interpreter in Rust), and Port of Context (pctx, the implementation used in this case study).

The pctx implementation uses TypeScript running in a Deno sandbox with specific permission flags, a 10-second timeout, and a network allow-list scoped to MCP hosts. A critical feature is the pre-flight type-check: TypeScript validates the program before any tool executes, so errors surface as compiler diagnostics rather than runtime crashes. This provides faster feedback to the model and prevents wasted API calls on syntactically invalid programs.

The sandbox model enforces security through Deno permission flags rather than through code interpretation restrictions. The agent has controlled access to network endpoints (only MCP hosts), filesystem operations, and environment variables. This is more permissive than Pydantic's Monty (which removes open, eval, exec, and __import__ entirely) but more structured than Cloudflare's approach (V8 isolates with bindings).

One of pctx's distinguishing features is its model-agnostic design. The same implementation worked across Sonnet 4-5, Opus 4-6, and GPT-5-4 without any code changes. This contrasts with Anthropic's Programmatic Tool Calling (Claude API only) and Pydantic's Monty (tied to Pydantic AI's agent abstraction). Cloudflare's Code Mode runs on the Workers platform and is tied to their Agents SDK. The ability to run the same workload across multiple model families was essential for discovering the different failure modes described earlier.

The pctx system offers three tool disclosure modes: catalog (dynamic discovery), filesystem (the model greps a virtual filesystem of typed tool definitions), and sidecar (upstream tools surfaced as MCP tools alongside execute_typescript). This flexibility allows different patterns depending on how many tools are available and how the agent should discover them. Other implementations generally offer a single tool disclosure pattern.

Visibility into execution is another differentiator. The pctx implementation returns a full diagnostic record to the agent including stdout, return values, type-check output, and runtime errors with line and column numbers. This allows the agent to learn from failures and retry with corrections. Anthropic's PTC deliberately strips tool results from context so only the final code output is visible—a different philosophical choice prioritizing context efficiency over execution transparency.

## Balanced Assessment and Critical Considerations

The case study presents compelling quantitative evidence that Code Mode execution substantially outperforms standard tool-use loops for this particular workload. The 100% vs 56% success rate and the 2x cost reduction are significant. However, several important caveats and considerations should be noted.

First, this workload is particularly well-suited to Code Mode's strengths. It involves multiple parallel API calls with large response payloads that can be aggregated programmatically. Tasks requiring iterative reasoning, dynamic decision-making based on intermediate results, or complex multi-step workflows with branching logic might not benefit as dramatically. The standard tool-use loop's ability to reason about each result before deciding the next step can be valuable in other contexts.

Second, the success metric of "delivered a Slack message" doesn't fully capture quality. The Sonnet results demonstrate that an agent can successfully execute and deliver output while being fundamentally wrong about what it searched for. Production deployments need quality validation beyond execution success.

Third, the pre-flight type-checking that pctx provides is genuinely valuable for catching errors early, but it also means the model must generate syntactically correct TypeScript on the first try. For models that struggle with code generation or for complex tool compositions, this could shift failures from runtime to the code generation phase. The case study doesn't report how often code generation failed or required retries.

Fourth, the cost comparison is based on successful runs. If Code Mode required multiple retries to generate correct TypeScript before achieving a successful execution, those retry costs would need to be factored into the true cost comparison. The case study doesn't provide visibility into retry patterns.

Fifth, the rate-limit failures in standard mode are specific to the API limits of the services being called (GitHub, Hacker News) and the per-minute quotas of the model providers. Different APIs with more generous limits or different quota structures might not show the same failure pattern. The fundamental token efficiency advantage would remain, but the reliability gap might narrow.

## Production Deployment and Future Direction

Following the experiment, Port of Context deployed Code Mode as the production execution path for their GTM agent. Their roadmap includes expanding to more sources beyond GitHub and Hacker News, covering additional keyword sets, and implementing scheduled runs through goose. They're also planning to open-source the GTM agent itself so other teams building MCP servers for sandboxed-execution clients can study, fork, or extend it.

The typed-output-schema design baked into their MCP server—with full input and output schemas returned through Arcade's runtime—is positioned as a key enabler for Code Mode's clean function-call chaining. This architectural pattern generalizes beyond their specific use case to any team building on the MCP + sandboxed execution stack.

## Broader LLMOps Implications

This case study illuminates several important considerations for production LLM agent deployments. The architectural choice between iterative tool loops and sandboxed code execution has dramatic impacts on cost, reliability, and token efficiency. For workloads involving multiple API calls with large payloads, keeping intermediate results outside the context window through sandboxed execution can cut costs in half and eliminate rate-limit failures entirely.

Model selection matters significantly for production outcomes, and not just for standard benchmarked capabilities. The same prompt produced confident but wrong results from Sonnet, self-correcting accurate results from Opus, and mostly correct but occasionally mis-framed results from GPT. Production systems need model-specific testing and validation strategies.

The tooling ecosystem around agents—MCP servers, runtimes like Arcade.dev, agent harnesses like goose, and execution environments like pctx—is maturing rapidly with different architectural philosophies. The choice between model-specific implementations (like Anthropic's PTC) and model-agnostic frameworks (like pctx) involves tradeoffs between optimization for a specific model versus portability across model families.

Authorization and policy management for tool access is a critical but often under-discussed aspect of production agent deployments. The use of Arcade.dev to handle OAuth flows with per-request scope management demonstrates the value of runtime-managed authorization rather than bespoke token management code.

Finally, the importance of diagnostic visibility and type safety in production agent systems emerges as a key theme. Pre-flight type checking prevents wasted API calls on invalid programs, and detailed execution diagnostics enable agents to learn from failures and self-correct. These operational characteristics matter as much as raw performance metrics for production reliability.
