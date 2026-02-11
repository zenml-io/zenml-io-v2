---
title: "AI-Powered Developer Tools for Code Quality and Test Generation"
slug: "ai-powered-developer-tools-for-code-quality-and-test-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68342a62c02f1d785fd1b2ba"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-01T11:07:45.646Z"
  lastUpdated: "2025-11-26T11:40:50.678Z"
  createdOn: "2025-05-26T08:46:26.541Z"
llmopsTags:
  - "code-generation"
  - "customer-support"
  - "code-interpretation"
  - "data-analysis"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "system-prompts"
  - "error-handling"
  - "langchain"
  - "cicd"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "open-source"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "Uber"
summary: "Uber's developer platform team built AI-powered developer tools using LangGraph to improve code quality and automate test generation for their 5,000 engineers. Their approach focuses on three pillars: targeted product development for developer workflows, cross-cutting AI primitives, and intentional technology transfer. The team developed Validator, an IDE-integrated tool that flags best practices violations and security issues with automatic fixes, and AutoCover, which generates comprehensive test suites with coverage validation. These tools demonstrate the successful deployment of multi-agent systems in production, achieving measurable improvements including thousands of daily fix interactions, 10% increase in developer platform coverage, and 21,000 developer hours saved through automated test generation."
link: "https://www.youtube.com/watch?v=Bugs0dVcNI8"
year: 2025
seo:
  title: "Uber: AI-Powered Developer Tools for Code Quality and Test Generation - ZenML LLMOps Database"
  description: "Uber's developer platform team built AI-powered developer tools using LangGraph to improve code quality and automate test generation for their 5,000 engineers. Their approach focuses on three pillars: targeted product development for developer workflows, cross-cutting AI primitives, and intentional technology transfer. The team developed Validator, an IDE-integrated tool that flags best practices violations and security issues with automatic fixes, and AutoCover, which generates comprehensive test suites with coverage validation. These tools demonstrate the successful deployment of multi-agent systems in production, achieving measurable improvements including thousands of daily fix interactions, 10% increase in developer platform coverage, and 21,000 developer hours saved through automated test generation."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-developer-tools-for-code-quality-and-test-generation"
  ogTitle: "Uber: AI-Powered Developer Tools for Code Quality and Test Generation - ZenML LLMOps Database"
  ogDescription: "Uber's developer platform team built AI-powered developer tools using LangGraph to improve code quality and automate test generation for their 5,000 engineers. Their approach focuses on three pillars: targeted product development for developer workflows, cross-cutting AI primitives, and intentional technology transfer. The team developed Validator, an IDE-integrated tool that flags best practices violations and security issues with automatic fixes, and AutoCover, which generates comprehensive test suites with coverage validation. These tools demonstrate the successful deployment of multi-agent systems in production, achieving measurable improvements including thousands of daily fix interactions, 10% increase in developer platform coverage, and 21,000 developer hours saved through automated test generation."
---

## Overview

Uber's developer platform team presented their approach to building AI-powered developer tools at scale, serving approximately 5,000 developers working on a codebase with hundreds of millions of lines of code. The company processes 33 million trips daily across 15,000 cities, and maintaining this infrastructure requires robust developer tooling. The presentation, delivered by Matasanis and Sorup Sherhhati, focuses on how they leveraged LangGraph to create composable, reusable AI agents that power multiple developer-facing products.

## Strategic Framework

The team operates on three core pillars for their AI developer tool strategy:

**Product Bets**: They focus on identifying specific developer workflows that can be improved with AI, such as writing tests and reviewing code. The emphasis is on eliminating toil and making existing workflows faster rather than creating entirely new paradigms.

**Cross-cutting Primitives**: Building foundational AI technologies and abstractions that can be reused across multiple solutions. This includes developing the right frameworks and tooling that accelerate the development of new AI-powered features.

**Intentional Tech Transfer**: Perhaps the most interesting aspect of their strategy is the deliberate effort to identify reusable components from individual products and spin them out as shared primitives. This has led to the creation of "Lang Effect," their internal opinionated framework that wraps LangGraph and LangChain to work better with Uber's internal systems.

## Core Products

### Validator

Validator is an IDE-integrated experience that automatically flags best practice violations and security issues in code. The architecture is built as a LangGraph agent with a polished IDE user experience. When a developer opens a file (the example shown was a Go file), Validator analyzes the code and displays diagnostics for issues—for instance, flagging when an incorrect method is used to create temporary test files that could leak into the host system.

The user experience is well-considered: developers can either apply a pre-computed fix that was prepared in the background, or they can send the fix request to their IDE's agentic assistant. This demonstrates the composability thinking that runs through their architecture—the same fix capability can be consumed through different interfaces.

A key architectural insight from Validator is the composition of multiple sub-agents under a central coordinator. They have an LLM-powered sub-agent that evaluates code against a list of best practices, but they also incorporate deterministic components—specifically, they run static linters and pass those findings through the rest of the graph. This hybrid approach of combining LLM-based analysis with deterministic tooling is a pattern that recurs throughout their architecture.

The impact metrics are impressive: thousands of fix interactions daily from engineers resolving code issues before they become larger problems.

### AutoCover

AutoCover is a more complex tool designed to automatically generate high-quality, passing tests that raise code coverage. The emphasis is on generating tests that are validated through actual execution and mutation testing, not just syntactically correct code. The goal is saving developer time so engineers can focus on implementing business features rather than writing boilerplate tests.

The workflow begins when a developer invokes AutoCover on a source file. Multiple background operations kick off simultaneously: adding a new target to the build system, setting up a test file, running an initial coverage check to establish a baseline, and analyzing surrounding source code to understand business context.

What the developer sees is a test file that's in "constant flux"—tests stream in rapidly, builds run, failing tests get removed, tests may be merged or marked redundant, and eventually benchmark and concurrency tests appear. The final output is a vetted set of validated tests.

The underlying graph architecture is particularly sophisticated. It includes:

- **Scaffolder**: Prepares the test environment and identifies business cases worth testing
- **Generator**: Creates new test cases, whether extending existing tests or writing new ones
- **Executor**: Runs builds, tests, and coverage checks
- **Validator**: The same agent described earlier, reused to validate the generated tests

A critical performance optimization is parallelization. Because there's no human in the loop during generation, they can "supercharge" the graph—running up to 100 iterations of code generation simultaneously and 100 test executions at the same time for sufficiently large source files. This parallelization, combined with deep integration with their build system, gives them significant performance advantages.

The benchmarking results are notable: 2-3x more coverage in half the time compared to industry agentic coding tools for test generation. In terms of business impact, AutoCover has raised developer platform coverage by approximately 10%, which they calculate as equivalent to 21,000 dev hours saved, with thousands of tests generated monthly.

## Additional Products

The presenters also highlighted several other products built on the same foundations:

**Uber Assistant Builder**: An internal "Custom GPT store" where teams can build chatbots steeped in Uber knowledge. One example is a security scorebot that has access to the same tools as Validator, allowing developers to ask architecture questions and get security feedback before writing code.

**Picasso/Genie**: A conversational AI interface for their internal workflow management platform. It understands workflow automations and can provide feedback grounded in product truth.

**UReview**: A code review tool that reinforces quality checks at PR merge time. It uses the same underlying tools as Validator and AutoCover to flag issues and suggest fixes during the review process, catching issues that slip through earlier in the workflow.

## Technical Learnings

### Domain-Expert Agents

The team found that building highly capable domain-specific agents produces outsized results compared to generic agents. These specialized agents use context more effectively, can encode rich state, and hallucinate less. A concrete example is their executor agent, which is finely tuned to interact with Uber's build system—it can execute 100 tests on the same file without collision and generate separate coverage reports for each.

### Deterministic Composition

When possible, they compose LLM-powered agents with deterministic sub-agents or make entire components deterministic. The lint agent within Validator is a prime example—static analysis tools provide reliable, deterministic output that doesn't need LLM inference. This reliability is then passed through the graph for downstream processing. This hybrid approach reduces hallucination risk and improves overall system reliability.

### Bounded Problem Solving and Reuse

Creating agents that solve bounded, well-defined problems enables significant reuse. The Validator agent appears both as a standalone IDE experience and as a validation step within AutoCover. At an even lower level, the build system agent is used across multiple products, providing a consistent interface for executing builds and tests.

## Organizational Learnings

Beyond the technical aspects, the presenters emphasized organizational patterns that enabled their success:

**Encapsulation Boosts Collaboration**: Well-thought-out abstractions like LangGraph, combined with opinions on state management and concurrency, allow horizontal scaling of development. The security team was able to write rules for Validator without understanding the underlying AI agent architecture—they simply needed to understand the interface for specifying rules.

**Graphs Model Developer Interactions**: The graph-based architecture often mirrors how developers already interact with systems. This alignment means that identifying process bottlenecks for AI workloads also improves experiences for non-AI tooling.

**Symbiotic Improvement**: Building agentic systems surfaced inefficiencies in underlying systems (mock generation, build file modification, test execution). Fixing these "paper cuts" improved the experience for all developers, not just those using AI tools. This represents a virtuous cycle where AI tool development drives broader infrastructure improvements.

## Framework and Infrastructure

The team built "Lang Effect," an opinionated internal framework wrapping LangGraph and LangChain to integrate with Uber's internal systems. This framework emerged organically as multiple teams began building agentic solutions and needed shared patterns for things like state management, concurrency handling, and integration with internal services.

The decision to standardize on LangGraph was driven by observing its organic proliferation across the organization. Rather than letting fragmentation occur, they invested in a consistent abstraction layer that makes agentic development more accessible while maintaining integration with Uber's infrastructure.

## Assessment

This case study represents a mature approach to deploying LLM-based tooling at scale. The emphasis on composability, reuse, and hybrid deterministic/LLM architectures reflects lessons learned from production deployment rather than theoretical design. The quantitative results (coverage improvements, dev hours saved, benchmark comparisons) provide concrete evidence of value delivery.

The organizational insights about encapsulation and collaboration are particularly valuable—they demonstrate that successful LLMOps isn't just about the technology but about how teams structure work and share capabilities. The observation that agentic development improves underlying infrastructure creates a compelling argument for investment in these tools beyond just the direct productivity gains.

One area not deeply covered is evaluation and testing of the agents themselves, or how they handle edge cases and failures. The presentation focused more on capabilities and outcomes than on the operational aspects of maintaining these systems in production. Additionally, while the performance comparisons to "industry agentic coding tools" are mentioned, specific baselines or methodologies aren't provided, making it difficult to fully validate those claims.