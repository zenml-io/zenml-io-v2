---
title: "Reducing Coding-Agent Token Costs with Declarative Model Routing"
slug: "reducing-coding-agent-token-costs-with-declarative-model-routing"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "structured-output"
  - "agent-based"
  - "prompt-engineering"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "mcp"
  - "evals"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Spotify"
summary: "Spotify used Portal's AiKA Modes and a Claude Code plugin called shunt to route predictable, I/O-heavy coding tasks from Claude Code to Gemini 2.5 Flash. Two ephemeral, declarative agents handled large-file analysis and boilerplate code generation, while Claude Code remained responsible for targeted reads, editing, debugging, and higher-value reasoning. Hooks blocked expensive reads of large files, scripts invoked the worker modes through the Portal CLI, and skills guided Claude Code toward the delegated workflows. In a Java monorepo benchmark, bulk-read scenarios reportedly reduced Claude's consumed tokens by around 90%, although the comparison was authored by the implementer, code-generation savings were harder to quantify, and delegation introduced latency and quality limitations."
link: "https://engineering.atspotify.com/2026/9/portal-by-spotify-cut-my-claude-code-token-usage-by-90"
year: 2026
seo:
  title: "Spotify: Reducing Coding-Agent Token Costs with Declarative Model Routing - ZenML LLMOps Database"
  description: "Spotify used Portal's AiKA Modes and a Claude Code plugin called shunt to route predictable, I/O-heavy coding tasks from Claude Code to Gemini 2.5 Flash. Two ephemeral, declarative agents handled large-file analysis and boilerplate code generation, while Claude Code remained responsible for targeted reads, editing, debugging, and higher-value reasoning. Hooks blocked expensive reads of large files, scripts invoked the worker modes through the Portal CLI, and skills guided Claude Code toward the delegated workflows. In a Java monorepo benchmark, bulk-read scenarios reportedly reduced Claude's consumed tokens by around 90%, although the comparison was authored by the implementer, code-generation savings were harder to quantify, and delegation introduced latency and quality limitations."
  canonical: "https://www.zenml.io/llmops-database/reducing-coding-agent-token-costs-with-declarative-model-routing"
  ogTitle: "Spotify: Reducing Coding-Agent Token Costs with Declarative Model Routing - ZenML LLMOps Database"
  ogDescription: "Spotify used Portal's AiKA Modes and a Claude Code plugin called shunt to route predictable, I/O-heavy coding tasks from Claude Code to Gemini 2.5 Flash. Two ephemeral, declarative agents handled large-file analysis and boilerplate code generation, while Claude Code remained responsible for targeted reads, editing, debugging, and higher-value reasoning. Hooks blocked expensive reads of large files, scripts invoked the worker modes through the Portal CLI, and skills guided Claude Code toward the delegated workflows. In a Java monorepo benchmark, bulk-read scenarios reportedly reduced Claude's consumed tokens by around 90%, although the comparison was authored by the implementer, code-generation savings were harder to quantify, and delegation introduced latency and quality limitations."
notion:
  pageId: "3d4f8dff-2538-800f-bbce-f3268b27d46d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-07T08:09:00.000Z"
  lastEditedTime: "2026-09-07T08:09:00.000Z"
  publishedAt: "2026-09-07T09:27:24Z"
---

## Overview

Spotify describes a production-oriented workflow for reducing the cost of AI-assisted software development. The core observation is that many coding-agent tasks consume frontier-model tokens on mechanical input/output rather than difficult reasoning: reading several large files, reproducing established test patterns, generating configuration scaffolding, or updating predictable documentation. The implementation routes those tasks to cheaper worker-model invocations while retaining Claude Code for tasks that require contextual judgment, precise editing, debugging, architectural decisions, or safety-critical reasoning.

The system combines Portal by Spotify's AiKA Modes with a Claude Code plugin named shunt. Two declarative modes, `bulk-reader` and `code-writer`, use Gemini 2.5 Flash in the examples, although the Portal configuration can select another available model. A benchmark on a Java monorepo reported approximately 90% mean savings in Claude-consumed tokens for bulk-read scenarios. That result is useful as an indication of potential, but it should not be treated as an independently validated production-wide cost reduction: the text does not provide the test corpus, baseline token counts, variance, quality scores, or a separate evaluation methodology.

## Problem and use-case selection

The expensive model was being used for work that was considered predictable or primarily I/O-bound. Examples included reading five files to answer a question about one method and generating a test file that follows the patterns of neighboring tests. The proposed optimization is therefore selective delegation rather than replacing Claude Code altogether. Claude remains the orchestrator and handles the cases where a worker model's lower cost may be outweighed by weaker reasoning, missing context, or the need to make exact changes.

This division is important operationally. The system explicitly does not attempt to delegate all coding work. The source reports that the worker model could identify surface-level patterns but missed a subtle thread-safety bug that Claude found after receiving the appropriate context. It also notes that summaries do not provide sufficiently reliable line numbers for editing. Consequently, the routing design focuses on understanding large inputs and generating highly patterned outputs, not on autonomous diagnosis or unrestricted code modification.

## Architecture and runtime model

AiKA Modes are described as declarative agents running on ephemeral runtimes, conceptually similar to serverless functions for agents. A mode specifies instructions, a model, parameters such as temperature, visibility, and optional MCP tools. Portal manages the runtime and exposes the modes through its CLI or API, avoiding application-specific long-running servers, infrastructure management, and directly managed model API keys. Modes can be private or shared publicly within the organization, and the worker model can be changed without changing the client-side routing plugin.

The two modes are deliberately narrow. `bulk-reader` is instructed to read supplied files and answer a question concisely using structured bullets, with each bullet led by an exact name, type, or line number. It uses a low temperature of 0.2 in the example. `code-writer` receives a specification and reference files, then generates code matching existing conventions and outputs only the code. The output-only instruction is an operational control: without it, explanatory prose and Markdown fences would create additional parsing work for Claude Code. The reference-file requirement is another quality control, preventing the worker from generating context-free code that does not fit the repository.

Each invocation is ephemeral and, according to the source, is not stored server-side. For follow-up questions, the files are sent again to the worker model; they do not enter Claude's context. This can reduce the context and token burden on Claude, but it does not mean that the overall system performs no additional inference or data transfer. The files still travel to the Portal backend and worker model, so organizations would need to assess data-governance, retention, access-control, and network implications before applying the pattern to sensitive repositories. The source does not provide those controls or a security assessment.

## Enforced routing with Claude Code

The first implementation used advisory instructions in `CLAUDE.md`. The author found that Claude could ignore those rules and that every project needed a copy. Shunt replaces that soft control with three layers.

The first layer is Claude Code `PreToolUse` hooks. A `check-file-size` hook runs before `Read` calls and blocks reads above a configurable line threshold, 350 lines by default. The block message directs Claude to the `/bulk-reader` skill. Targeted reads using a relevant section, offset, or limit are allowed because the agent may need exact local context for editing or reasoning. A second hook catches shell commands such as `cat`, `head`, `tail`, `less`, and `more` when they are used to read large files. Piped commands such as `cat file | grep` are allowed as targeted reads. The threshold can be changed with `SHUNT_MIN_LINES`, including through `.claude/settings.json`.

The second layer consists of shell scripts that wrap Portal CLI actions. `bulk-read` accepts a question and file paths, wraps each file in XML tags to establish boundaries, invokes the named mode, unwraps errors, and reports token usage on standard error. `code-write` accepts a specification and reference file, invokes `code-writer`, removes Markdown fences if present, and can write the result directly to disk. Claude therefore need not ingest the generated file as output tokens. Mode resolution is handled by Portal: names are case-insensitive, with a user's own mode taking precedence over team and public modes. This enables customization by forking a public mode without changing the calling scripts.

The third layer is a pair of skills that explain when and how to call the scripts. Skills improve discoverability and invocation correctness, but they are not the main enforcement mechanism. If Claude does not read a skill description, the hook can still block the costly operation and provide a redirect. This layered design is a practical LLMOps control because it combines policy enforcement, execution wrappers, and model-facing instructions rather than depending only on prompt compliance.

## Evaluation and reported results

The workflow was tested on a Java monorepo across four scenarios, comparing the tokens Claude would consume when reading files directly with the tokens it would consume when using a bulk-reader summary. The source reports mean bulk-read savings of roughly 90%. The measurement appears to focus on Claude's consumption rather than total end-to-end inference cost, latency, or organizational spend. It also does not state whether summary quality was evaluated systematically, whether the same questions were used across repeated trials, or whether worker-model tokens and Portal costs were included. Thus, the figure supports the claim that context can be kept out of the expensive model, but it is not enough to establish a universal 90% reduction in total coding-agent cost.

The code-write case is more difficult to measure. Without shunt, Claude reads reference files and generates the output using expensive input and output tokens. With shunt, the generated code is written directly to disk and Claude never sees it. This changes both the token accounting and the workflow boundary, so a fair comparison would need to include worker-model tokens, Portal charges, latency, successful-generation rate, review and correction effort, and any cost of failed or unsafe code. The source provides no such measurements.

## Results, limitations, and tradeoffs

The principal reported benefit is lower use of the frontier model for repetitive work, combined with reusable routing assets across projects and tools that can invoke the Portal CLI. Centralizing the worker behavior in modes separates the routing decision from the worker implementation: the plugin decides when delegation is appropriate, while the mode defines the prompt, model, temperature, and tools. This makes model substitution and prompt iteration configuration changes rather than changes to every project integration. Public and shareable modes can also standardize common workflows across a team.

There are meaningful costs. Delegation adds a network round trip from Claude Code to Portal, then to the worker model and back. Typical responses take 10–30 seconds, and a single invocation is capped at 30 seconds. This may be acceptable when avoiding a very large read, but it can be slower than a direct read for small files. The size threshold is therefore a latency-and-cost heuristic, not a universal optimum; it should be tuned against repository size, model pricing, response quality, and developer workflow.

The worker output is not reliable enough for all editing tasks, especially where exact line references or nuanced relationships matter. It can miss subtle defects, and the source explicitly excludes debugging, architectural decisions, and safety-critical code from routing. Generated code still requires appropriate review and testing even when it matches nearby patterns. The hook can enforce that Claude does not perform a class of reads, but it cannot by itself prove that a worker answer is correct or that generated code is safe.

From an LLMOps perspective, the strongest pattern is controlled specialization: small, low-temperature modes for constrained tasks; explicit tool boundaries; deterministic output formats; hooks that enforce routing policy; scripts that provide an integration and error-handling boundary; and skills that improve agent usability. A mature deployment would additionally track per-request model and token usage, latency, failure and retry rates, acceptance or correction rates for generated code, quality regressions, and total cost across both worker and frontier models. Those operational measurements are not included in the case study, so the reported token reduction should be understood as an encouraging implementation result rather than a complete production-efficiency evaluation.

## Deployment context

The described setup requires the Portal and shunt plugins, Portal CLI setup and authentication against a Portal instance, and access to the public `bulk-reader` and `code-writer` modes or customized forks. The article presents the system as available for Spotify's development environment and labels the modes reusable across projects and shareable with a team. The case study is dated September 3, 2026, and concerns developer tooling rather than a customer-facing model feature.
