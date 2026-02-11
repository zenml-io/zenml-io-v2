---
title: "AI-Powered Automated Issue Resolution Achieving State-of-the-Art Performance on SWE-bench"
slug: "ai-powered-automated-issue-resolution-achieving-state-of-the-art-performance-on-swe-bench"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "683d79477531d02f154adad0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:10:22.891Z"
  createdOn: "2025-06-02T10:13:27.429Z"
llmopsTags:
  - "code-generation"
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "few-shot"
  - "prompt-engineering"
  - "error-handling"
  - "fallback-strategies"
  - "fastapi"
  - "open-source"
  - "documentation"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "tech"
company: "Trae"
summary: "Trae developed an AI engineering system that achieved 70.6% accuracy on the SWE-bench Verified benchmark, setting a new state-of-the-art record for automated software issue resolution. The solution combines multiple large language models (Claude 3.7, Gemini 2.5 Pro, and OpenAI o4-mini) in a sophisticated multi-stage pipeline featuring generation, filtering, and voting mechanisms. The system uses specialized agents including a Coder agent for patch generation, a Tester agent for regression testing, and a Selector agent that employs both syntax-based voting and multi-selection voting to identify the best solution from multiple candidate patches."
link: "https://www.trae.ai/blog/product_update_0528"
year: 2025
seo:
  title: "Trae: AI-Powered Automated Issue Resolution Achieving State-of-the-Art Performance on SWE-bench - ZenML LLMOps Database"
  description: "Trae developed an AI engineering system that achieved 70.6% accuracy on the SWE-bench Verified benchmark, setting a new state-of-the-art record for automated software issue resolution. The solution combines multiple large language models (Claude 3.7, Gemini 2.5 Pro, and OpenAI o4-mini) in a sophisticated multi-stage pipeline featuring generation, filtering, and voting mechanisms. The system uses specialized agents including a Coder agent for patch generation, a Tester agent for regression testing, and a Selector agent that employs both syntax-based voting and multi-selection voting to identify the best solution from multiple candidate patches."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-automated-issue-resolution-achieving-state-of-the-art-performance-on-swe-bench"
  ogTitle: "Trae: AI-Powered Automated Issue Resolution Achieving State-of-the-Art Performance on SWE-bench - ZenML LLMOps Database"
  ogDescription: "Trae developed an AI engineering system that achieved 70.6% accuracy on the SWE-bench Verified benchmark, setting a new state-of-the-art record for automated software issue resolution. The solution combines multiple large language models (Claude 3.7, Gemini 2.5 Pro, and OpenAI o4-mini) in a sophisticated multi-stage pipeline featuring generation, filtering, and voting mechanisms. The system uses specialized agents including a Coder agent for patch generation, a Tester agent for regression testing, and a Selector agent that employs both syntax-based voting and multi-selection voting to identify the best solution from multiple candidate patches."
---

## Overview

Trae is an AI-powered IDE that positions itself as a "real AI engineer" offering AI Q&A, code auto-completion, and agent-based programming capabilities. This case study documents their achievement of a 70.6% resolve rate on the SWE-bench Verified benchmark, which is a widely recognized evaluation framework for assessing AI systems' ability to automatically fix software issues. While Trae presents this as a "#1" ranking, it's important to note their own caveat that this is only when compared to Claude 3.7 results, and the position is "next only to Tools" when Claude 4 results are included on the leaderboard. This nuance is important for understanding the actual competitive landscape.

The core contribution of this work is not a single model breakthrough but rather a sophisticated orchestration layer that combines multiple LLMs, automated testing infrastructure, and voting-based selection mechanisms to maximize the probability of generating correct patches. This represents an interesting LLMOps pattern where the focus shifts from optimizing a single model to optimizing the system architecture around multiple models.

## Technical Architecture

### Agent Tooling Infrastructure

The foundation of Trae's approach rests on four core tools that are provided to the agent:

The **str_replace_editor** tool enables agents to browse files and edit code, providing the basic capability for code manipulation. The **Bash** tool allows the agent to execute arbitrary commands, which is essential for running tests, building projects, and validating changes. The **ckg_tools** component is particularly interesting as it builds a Code Knowledge Graph (CKG) for the code repository, enabling efficient `search_class` and `search_function` operations. This represents a retrieval-augmented approach specifically tailored for code understanding, allowing the agent to quickly navigate large codebases without processing everything in context. Finally, the **sequential_thinking_tool** facilitates step-by-step reasoning, essentially providing a structured approach to chain-of-thought prompting at the tool level.

### Single-Attempt Model Comparison

Before diving into their ensemble approach, Trae conducted experiments comparing different models on single-attempt end-to-end generation. The results showed Claude 3.7 Sonnet achieving a resolve rate between 60.6% and 62.6%, outperforming both OpenAI o4-mini (54.4% to 55.8%) and Gemini 2.5 Pro 0506 (52.4% to 55%). This establishes a baseline understanding of individual model capabilities before ensemble methods are applied.

### Multi-Stage Pipeline

The core innovation is a three-stage pipeline for patch generation and selection:

**Generation Stage**: Rather than relying on a single model, Trae employs multiple LLMs (Claude 3.7 Sonnet, Gemini 2.5 Pro, and o4-mini) as "Coder agents" to generate candidate patches. The explicit goal is to ensure diversity among generated candidates, recognizing that different models may have different strengths and failure modes.

**Filtering Stage**: Trae developed a "Tester agent" inspired by the Agentless project. This component automatically retrieves a subset of regression tests from the original project codebase that are relevant to the issue description. Importantly, they emphasize strict adherence to SWE-bench submission constraints, not utilizing any hidden test knowledge (PASS_TO_PASS or FAIL_TO_PASS cases). The Tester agent first validates that regression tests execute correctly on the original codebase, then runs them against candidate patches, eliminating those that fail. The team acknowledges the limitations of this approach: passing all regression tests doesn't guarantee correctness (some tests may themselves need modification), and correct patches may fail certain tests. However, their experimental results suggest patches passing regression tests are statistically more likely to be correct. If no candidates pass, all are retained for the next stage—a pragmatic fallback.

**Voting Stage**: The Selector agent implements a dual approach to final patch selection. The first phase uses syntax-based voting by clustering candidate patches based on syntactic equivalence using Tree-sitter for AST parsing with comments stripped. The rationale is that if multiple independent Coder agents generate syntactically equivalent patches, this consensus is a strong correctness signal. A dual-verification mechanism then validates the syntax-voted patch using the same four tools available to the Coder agents. If this verification passes, the patch is returned; if uncertainty remains, the system proceeds to multi-selection voting.

The multi-selection voting phase first deduplicates patches using AST representations to avoid bias from repeated patches and reduce input token length. Multiple Selector agents then independently vote on the most likely correct patch, with the highest-voted patch being selected. If votes remain evenly distributed, additional voting rounds are conducted until a clear winner emerges.

## LLM-as-a-Selector Insights

An important finding documented in this work relates to the limitations of simple LLM-based selection. When using OpenAI o1 as a selector (following the approach from the Augment swebench Agent project), performance initially improved with increased candidate pool size, validating test-time scaling laws. However, performance peaked at 5-6 candidates and then declined—at 8-9 candidates, performance was actually worse than at 3-4 candidates. This observation motivated the more sophisticated Selector Agent approach, aiming to maintain test-time scaling benefits while expanding the sampling space.

## Production Considerations and LLMOps Patterns

This case study illustrates several important LLMOps patterns:

**Multi-Model Orchestration**: Rather than depending on a single model, the architecture leverages multiple commercial LLMs (Claude, Gemini, and OpenAI models) for generation. This provides resilience against single-model failures and exploits the complementary strengths of different models.

**Automated Testing as a Filter**: The integration of regression testing represents a production-oriented approach to validating LLM outputs. This is a form of automated evaluation that goes beyond simple heuristics to actually execute code and validate behavior.

**Consensus-Based Selection**: The voting mechanism with AST-based clustering provides a principled approach to selecting among multiple candidates, using structural code analysis rather than relying solely on LLM judgment.

**Graceful Degradation**: The fallback behaviors (retaining all candidates if none pass tests, iteratively increasing voting rounds) show production-minded design that handles edge cases rather than failing.

## Limitations and Critical Assessment

It's important to note that this is primarily a benchmark optimization case study rather than a production deployment story. The SWE-bench Verified benchmark is a controlled evaluation environment, and performance there may not directly translate to real-world software engineering scenarios. The approach requires running multiple LLMs and multiple inference passes, which has significant cost and latency implications that aren't addressed in the text.

The claim of "#1" ranking should be read with the caveats provided—the position depends on which model generations are included in the comparison. Additionally, the 70.6% resolve rate, while impressive, still means roughly 30% of issues are not resolved correctly.

The computational cost of this approach is not discussed but is worth considering: generating multiple candidate patches across three different commercial LLM providers, running regression tests for filtering, and then conducting multiple rounds of voting with additional LLM calls represents a substantial resource investment compared to single-model approaches.

## Future Directions

The team outlines three areas for future work: improving single-run success rates to reduce the need for ensemble methods, investigating whether larger sampling spaces can identify more correct solutions (suggesting they believe current limits may be artificial), and optimizing the Selector agent's performance as sample space increases. This suggests an ongoing research direction rather than a finalized production system.

The mention of academic publications (AEGIS at FSE 2025 and SoRFT at ACL 2025) indicates this work is part of a broader research program exploring reinforcement learning and agent-based approaches for software engineering automation.