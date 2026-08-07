---
title: "Building a Programming Language at Agent Speed with AI-First Development Practices"
slug: "building-a-programming-language-at-agent-speed-with-ai-first-development-practices"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "poc"
  - "agent-based"
  - "harness-engineering"
  - "error-handling"
  - "evals"
  - "cicd"
  - "documentation"
  - "open-source"
  - "anthropic"
industryTags: "tech"
company: "Boundary"
summary: "Boundary built BAML, a new programming language designed from first principles for AI-agent development, over three years with a team of eight engineers using unconventional engineering practices that eliminate code reviews and standardization. The team addressed the challenge of \"slop\" (unread AI-generated code) by building internal tooling that enforces architectural invariants, automated design documentation systems integrated with Slack, dependency visualization tools, and most critically, agent-based testing systems that continuously generate BAML programs and analyze execution traces to identify issues and AB test language features. The result is a production-ready programming language with deterministic error handling, zero-cost execution tracing, cross-language interoperability, and agent-first tooling that enables engineers to ship stable code without traditional review processes."
link: "https://www.youtube.com/watch?v=AMiyLItEtLA"
year: 2026
seo:
  title: "Boundary: Building a Programming Language at Agent Speed with AI-First Development Practices - ZenML LLMOps Database"
  description: "Boundary built BAML, a new programming language designed from first principles for AI-agent development, over three years with a team of eight engineers using unconventional engineering practices that eliminate code reviews and standardization. The team addressed the challenge of \"slop\" (unread AI-generated code) by building internal tooling that enforces architectural invariants, automated design documentation systems integrated with Slack, dependency visualization tools, and most critically, agent-based testing systems that continuously generate BAML programs and analyze execution traces to identify issues and AB test language features. The result is a production-ready programming language with deterministic error handling, zero-cost execution tracing, cross-language interoperability, and agent-first tooling that enables engineers to ship stable code without traditional review processes."
  canonical: "https://www.zenml.io/llmops-database/building-a-programming-language-at-agent-speed-with-ai-first-development-practices"
  ogTitle: "Boundary: Building a Programming Language at Agent Speed with AI-First Development Practices - ZenML LLMOps Database"
  ogDescription: "Boundary built BAML, a new programming language designed from first principles for AI-agent development, over three years with a team of eight engineers using unconventional engineering practices that eliminate code reviews and standardization. The team addressed the challenge of \"slop\" (unread AI-generated code) by building internal tooling that enforces architectural invariants, automated design documentation systems integrated with Slack, dependency visualization tools, and most critically, agent-based testing systems that continuously generate BAML programs and analyze execution traces to identify issues and AB test language features. The result is a production-ready programming language with deterministic error handling, zero-cost execution tracing, cross-language interoperability, and agent-first tooling that enables engineers to ship stable code without traditional review processes."
notion:
  pageId: "3b4f8dff-2538-8039-a6e0-cdea637a03bb"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:33:00.000Z"
  lastEditedTime: "2026-08-06T11:33:00.000Z"
  publishedAt: "2026-08-07T13:07:16Z"
---

## Overview

Boundary is building BAML, a programming language developed specifically for the AI-agent era, with a team of eight engineers over approximately three years. The company's approach represents a radical rethinking of software engineering practices in the context of LLM-powered development. The presentation, delivered by Vaibhav, tackles the central problem of what he calls "slop" - any code that developers don't actually read - and how to build reliable, production-grade systems when AI agents generate most of the code. The core philosophy is captured in the phrase "to defeat the slop, we must become the slop," meaning that instead of fighting AI-generated code, the team embraced it while building infrastructure to ensure quality and correctness.

The context is particularly important: Boundary is building a programming language, which demands absolute precision and has no tolerance for errors or inconsistent behavior. Design decisions made early in a language's lifecycle are difficult or impossible to change later without breaking compatibility. This makes their unconventional approach particularly noteworthy - they eliminated code reviews entirely, allow engineers to work on components in parallel without coordination, and permit each engineer to use whatever AI tools they prefer (Claude, Codex, or other models) without standardization.

## Engineering Practices and Cultural Foundation

The team's engineering practices deliberately invert traditional software development wisdom. Rather than enforcing code reviews, standardization, or sequential development, they built systems that make these practices unnecessary. The foundation of this approach rests on a principle the speaker articulates clearly: "Code can be slop, writing cannot." This means that while AI-generated code might not be read line-by-line, the design thinking and architectural decisions must be carefully considered and well-documented.

The team operates under the pragmatic assumption that engineers will use different AI models and tools based on their preferences. Some team members prefer Claude, others use Codex, and still others experiment with new tools discovered on platforms like Hacker News. Rather than trying to enforce uniformity, the team built infrastructure that accommodates this heterogeneity while maintaining system-level consistency.

## Architectural Invariants and Standards

The first major challenge the team addressed was maintaining architectural coherence without enforcing rigid standards. Their solution was an architecture.md file that serves as an invariant document. This file is intentionally kept small and contains only information that remains stable for months or years - specifically, the layers of the compiler architecture. The file is written in a way that any AI model can understand, avoiding model-specific formatting or instructions.

The architecture file includes a simple but effective rule: as agents work deeper into the compiler stack, they must consult with at least one other person (or agent). This creates natural checkpoints that slow down potentially problematic changes without blocking progress entirely. The key insight is that architectural invariants, when properly designed, can be more effective than process-based code reviews because they're encoded into the development workflow itself.

## Design Documentation and Knowledge Sharing

Boundary built custom tooling to ensure design quality despite the lack of code reviews. They created a design documentation tool that serves as a replacement for both Notion and GitHub for design documents. The tool includes versioning, commenting, and other collaborative features. However, the tool itself wasn't sufficient - engineers needed to actually use it and read each other's work.

The breakthrough came from a Slack integration that posts notifications to a dedicated channel every time a design document is updated. This channel became the most popular in the company, with engineers reading new design docs even at 2 AM, motivated by genuine interest rather than process requirements. The social dynamic created an organic review system where interesting designs naturally attracted attention and discussion.

The design documentation system is backed by Markdown files and simple CLI scripts, making it accessible not just to human engineers but also to AI agents. This is a critical LLMOps consideration: tooling must work for both human and machine users. The presenter notes experiencing what he calls "AI psychosis" where he began shipping ten design docs per day using AI assistance, which created its own problems. The team added a final requirement: design docs require readers before they're considered complete. This creates a natural quality filter without formal approval processes.

## Dependency Management and Architecture Evolution

Boundary built visualization tooling for their internal dependency graph, including external dependencies. This visualization allows the team to watch how the codebase changes over time, with semantic boundaries and individual packages clearly delineated. More importantly, they built CLI tools that enforce architectural invariants - certain dependencies or patterns that would create "leaky" abstractions are automatically detected and blocked.

When Claude or another AI agent creates a new package or adds a problematic dependency, the CI/CD system detects the violation, and Git commit history provides exact traceability to identify where things broke. This system has proven so effective that their architecture hasn't changed in three to four months, indicating stability and maturity. The visualization and enforcement tools give humans understanding of system-level changes without requiring them to read every line of code that agents generate.

## Agent-Based Testing and Continuous Validation

The most sophisticated LLMOps practice Boundary employs is agent-based testing for the BAML language itself. They built a system where AI agents continuously run and create BAML programs from scratch. These agents attempt to accomplish various programming tasks, and the system captures the entire conversation transcript from Claude or other models, including what tools were used and what happened during execution.

Humans can inspect these transcripts, but more importantly, other AI agents analyze them to identify what worked well and what didn't. The analysis goes beyond simple correctness checking - agents evaluate efficiency by detecting operations that took three tool calls when they should have taken only one. This creates a feedback loop where the language design itself is optimized for AI agent productivity, not just human productivity.

The system generates issues automatically, which humans then collaborate on to determine which are real problems, which are hallucinations, and which lack appropriate "taste" (though the speaker acknowledges disliking that term). Once validated, agents can create fixes for the identified problems. This creates a development pipeline where agents participate not just in writing code, but in testing, evaluation, and even fixing the compiler and language tooling itself.

## AB Testing for Language Features

Perhaps the most innovative LLMOps practice is AB testing language features and APIs. Instead of relying on human intuition about what makes a good language design, Boundary can empirically measure which designs result in fewer tool calls, fewer errors, and more correct outcomes when AI agents use the language. This data-driven approach to language design would be nearly impossible with traditional human-centric development, but becomes feasible when agents are the primary users (or at least significant users) of the language.

The ability to run thousands or millions of tokens worth of agent interactions and measure outcomes objectively transforms language design from an art into a science. The speaker emphasizes that this approach enables building "data-driven systems without ever writing a single line of code" - meaning without humans manually writing the test cases and evaluation frameworks.

## Production Impact and Scale

The results are remarkable: eight people built a production-ready programming language in less than two years, something that traditionally would require hundreds or thousands of person-years of effort. The speaker notes that just the day before the presentation, one engineer built a partial C compiler purely in BAML, demonstrating both the language's capabilities and the productivity gains from agent-assisted development.

The team's approach doesn't eliminate human involvement - instead, it shifts human effort from writing and reviewing code to building robust systems and processes that guide agent behavior. The speaker makes an analogy to CI/CD adoption: companies initially resist it because adding CI/CD slows development for about three months, but afterward, development velocity increases dramatically. Similarly, building the infrastructure for agent-driven development requires upfront investment but pays dividends in long-term productivity.

## BAML Language Design Philosophy

The language itself is designed from first principles with AI agents as first-class users. The speaker criticizes TypeScript's design goal of "balancing correctness and productivity" (meaning human productivity), pointing out absurdities like JavaScript's sort function converting everything to strings by default, or type coercion behaviors that confuse both humans and agents. These are examples of "slop baked into the language" that AI agents struggle with.

BAML's error handling system demonstrates the agent-first philosophy. Functions that can throw errors have those error types automatically inferred - if a function calls another function that throws a division-by-zero error, the calling function's type signature automatically reflects that it can also throw that error. This enables exhaustive error checking where the compiler can prove whether all possible errors have been handled. Agents don't need to guess about error handling; the type system makes it deterministic and verifiable.

The language includes execution tracing as a zero-cost abstraction, meaning every function call can be traced with negligible performance overhead. In traditional languages like Python or TypeScript, comprehensive tracing would slow execution to unusable levels. But by designing for it from the start, BAML makes execution traces the primary way to understand code behavior - critical in a world where agents generate code that humans don't read line-by-line.

## Tooling and Developer Experience

Boundary built several innovative tools for working with BAML code. A semantic code visualization tool shows not the raw code but a visual representation that can be clicked to navigate to specific lines. Developers can zoom in and out, choosing which parts to examine in detail and which to treat as black boxes. This aligns with the philosophy that understanding comes from comprehending the system, not reading every line.

They built a grep replacement that goes beyond text search. Instead of just finding where a term appears, it can describe functions with their docstrings and source code, and show everywhere they're used. This transforms multiple tool calls into a single operation, reducing friction for both humans and agents.

Every function in BAML is automatically available as a CLI command with parameters, enabling rapid testing without deploying or running the full application. Functions can be bundled into standalone CLI binaries that work across Windows, Mac, and Linux without developers worrying about cross-platform compatibility. The language can target multiple architectures including WebAssembly, removing deployment as a bottleneck.

## Cross-Language Interoperability

Recognizing that requiring developers to rewrite all existing code would doom adoption, Boundary designed BAML for seamless interoperability with existing languages. Every BAML function is automatically accessible from Python, TypeScript, Rust, Go, Ruby, Java, and potentially future languages. The interop is type-safe, providing both synchronous and asynchronous versions of each function.

The interoperability goes deeper than simple function calls. Developers can pass lambdas across language boundaries, use generics, and pass closures. A BAML function that implements timeout functionality can accept Python lambdas and execute them with guaranteed timeout behavior. This enables gradual adoption where teams can use BAML for new components while keeping existing codebases in their current languages, with the type system ensuring correctness across boundaries.

## Critical Assessment and Balance

While the presentation is promotional for BAML, the underlying LLMOps practices offer legitimate insights. The team has clearly invested significant effort in building infrastructure that makes agent-generated code trustable and maintainable. However, several caveats deserve consideration:

The approach works for Boundary partly because they're building developer tooling and a compiler - domains where formal methods, type systems, and automated testing are particularly effective. Many application domains require human judgment about business logic, user experience, or regulatory compliance that can't be delegated to agents regardless of tooling quality.

The claim of "no code reviews" is somewhat misleading. The team has essentially automated and distributed code review through architectural enforcement, design doc discussions, and agent-based testing. They haven't eliminated review - they've changed its form and timing. The Slack-based design doc review system and architectural invariant checking represent different manifestations of human oversight.

The eight-person team building a programming language in under two years is impressive, but we should note they're building a domain-specific language focused on particular use cases, not a general-purpose language competing with Python or JavaScript across all domains. The scope matters when evaluating productivity claims.

The AB testing of language features using agent interactions is genuinely innovative, though it optimizes for agent productivity rather than human ergonomics. This makes sense for tooling that agents will use heavily, but raises questions about long-term maintainability if humans need to debug or modify the agent-generated code. The assumption that execution traces and semantic visualization replace traditional code reading may hold for some contexts but not others.

## Broader Implications for LLMOps

Boundary's experience offers several generalizable lessons for LLMOps practitioners. First, tooling must serve both human and machine users - the Markdown-based design docs, CLI interfaces, and type-safe interop all work for agents and humans alike. Second, shifting quality enforcement from process (code reviews) to automation (CI/CD, architectural invariants, type systems) scales better in agent-heavy workflows. Third, continuous automated testing with agents creating and executing code provides rapid feedback loops that would be impossible with only human testers.

The emphasis on deterministic behavior, strong type systems, and automatic error inference reflects a broader principle: agents work better with systems that have less ambiguity and more machine-checkable correctness properties. This might drive language and framework evolution toward more formal methods and stronger static guarantees.

The team's acceptance that "this is the least amount of slop your codebase will ever have" reflects pragmatic realism about AI-generated code. Rather than pursuing an impossible goal of zero AI-generated code, they've built systems to manage and validate it effectively. This acceptance, combined with rigorous infrastructure, may represent a more sustainable path forward than either blindly trusting AI output or refusing to use it entirely.

The speaker's concluding challenge - to rethink foundational systems like version control, databases, and programming languages for an agent-first world - points to broader questions about software infrastructure evolution. Whether new systems are needed or existing ones can adapt remains an open question, but Boundary's work demonstrates that agent-first design creates genuinely different tradeoffs than human-first design.
