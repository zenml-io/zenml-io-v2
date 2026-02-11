---
title: "Automating Test Generation with LLMs at Scale"
slug: "automating-test-generation-with-llms-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bc78f1b68703dbb40af"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:35:47.525Z"
  createdOn: "2024-11-21T13:55:19.207Z"
llmopsTags:
  - "anthropic"
  - "cicd"
  - "code-generation"
  - "code-interpretation"
  - "continuous-deployment"
  - "continuous-integration"
  - "devops"
  - "documentation"
  - "error-handling"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "security"
  - "system-prompts"
industryTags: "tech"
company: "Assembled"
summary: "Assembled leveraged Large Language Models to automate and streamline their test writing process, resulting in hundreds of saved engineering hours. By developing effective prompting strategies and integrating LLMs into their development workflow, they were able to generate comprehensive test suites in minutes instead of hours, leading to increased test coverage and improved engineering velocity without compromising code quality."
link: "https://www.assembled.com/blog/how-we-saved-hundreds-of-engineering-hours-by-writing-tests-with-llms"
year: 2023
seo:
  title: "Assembled: Automating Test Generation with LLMs at Scale - ZenML LLMOps Database"
  description: "Assembled leveraged Large Language Models to automate and streamline their test writing process, resulting in hundreds of saved engineering hours. By developing effective prompting strategies and integrating LLMs into their development workflow, they were able to generate comprehensive test suites in minutes instead of hours, leading to increased test coverage and improved engineering velocity without compromising code quality."
  canonical: "https://www.zenml.io/llmops-database/automating-test-generation-with-llms-at-scale"
  ogTitle: "Assembled: Automating Test Generation with LLMs at Scale - ZenML LLMOps Database"
  ogDescription: "Assembled leveraged Large Language Models to automate and streamline their test writing process, resulting in hundreds of saved engineering hours. By developing effective prompting strategies and integrating LLMs into their development workflow, they were able to generate comprehensive test suites in minutes instead of hours, leading to increased test coverage and improved engineering velocity without compromising code quality."
---

## Overview

Assembled is a workforce management (WFM) software company that provides AI-powered solutions for contact centers, including AI-driven scheduling, ML-based forecasting, and real-time analytics. In this case study, their engineering team shares how they've integrated large language models into their development workflow specifically for generating unit tests. This represents an interesting internal use case of LLMOps—using LLMs not to power customer-facing features, but to enhance engineering productivity and code quality.

The case study, authored by John Wang (Co-Founder and CTO), presents a pragmatic approach to leveraging LLMs in a production engineering environment. Rather than making sweeping claims about AI replacing developers, it focuses on a specific, well-bounded use case where LLMs demonstrably add value: automating the tedious but important work of writing comprehensive test suites.

## The Problem

The fundamental tension in software engineering is between velocity and quality. Assembled positions engineering velocity as their "competitive edge," but comprehensive testing is often sacrificed due to time constraints or complexity. The case study references Martin Fowler's perspective that testing provides confidence to make changes to a system, not merely bug avoidance.

Writing good unit tests is time-consuming and requires considering multiple scenarios: normal cases, edge cases, error handling, and boundary conditions. Engineers often skip or minimize testing when under deadline pressure, which creates technical debt and increases the risk of production bugs.

## The LLM-Based Solution

The solution involves using high-quality code generation models—specifically OpenAI's o1-preview and Anthropic's Claude 3.5 Sonnet—to generate unit tests from carefully crafted prompts. The approach is relatively straightforward but effective.

### Prompt Engineering Approach

The core of the solution is a structured prompt template that includes several key components:

- **The function to test**: The exact code that needs test coverage
- **Struct definitions**: Any relevant type definitions used by the function, particularly for input and output objects
- **An example test suite**: Existing tests from the codebase that reflect the team's coding style and conventions

The example prompt provided in the case study is notably detailed, specifying requirements like using the "fixture pattern" (table-driven tests in Go), following Go's testing best practices, using specific packages (`testing` and `require` from testify), and covering various scenarios including edge cases and error handling.

This is a practical demonstration of prompt engineering principles: being specific about desired output format, providing examples of acceptable outputs, and giving the model sufficient context to produce useful results.

### Model Selection Strategy

The team explicitly recommends using "the smartest models" available—o1-preview and Claude 3.5 Sonnet—rather than faster, cheaper alternatives. Their rationale is that latency isn't a concern for this use case (test generation is not real-time), so quality should be prioritized. This reflects a thoughtful consideration of the tradeoffs between model capability, cost, and latency that is central to LLMOps decision-making.

### Integration with Development Workflow

The case study describes a manual but streamlined workflow: engineers construct prompts, submit them to an LLM (either through direct API access or tools like ChatGPT), review the generated tests, and iterate if necessary before copying the results into their codebase. They also mention that AI-assisted code editors like GitHub Copilot or Cursor can provide more context-aware suggestions, potentially reducing the need for detailed prompts.

The workflow acknowledges that LLM output is not immediately production-ready. Engineers must review for compilation issues, add missed edge cases, and adjust style to match codebase conventions. The company mandates that all engineers read and run LLM-generated tests before merging to production.

## Concrete Example and Results

The case study provides a concrete example using a Go function (`CalculateOrderSummary`) that calculates order totals for an e-commerce platform. When this function and supporting struct definitions were fed to ChatGPT o1-preview, it generated a comprehensive test suite in 48 seconds.

The generated tests demonstrated several quality attributes: they covered multiple scenarios (empty slices, nil slices, single item, multiple items, zero quantity), used idiomatic Go table-driven testing patterns, and correctly utilized the specified `testify/require` library. The case study notes that the test cases were "mutually exclusive and collectively exhaustive" and covered most edge cases a skilled engineer would consider.

## Extended Applications

Beyond basic unit testing, the team has applied the same approach to more complex scenarios:

- **Different programming languages**: The prompt can be adapted for TypeScript, JavaScript, or other languages with appropriate testing frameworks
- **Frontend component testing**: React components with user interactions and state changes can be tested using Jest and React Testing Library
- **Integration testing with mocked services**: Functions that interact with external APIs can be tested by mocking HTTP clients

## Claimed Results

The company claims several benefits from this approach, though these are presented anecdotally rather than with rigorous metrics:

- One engineer who "previously wrote few tests" began consistently writing them after using LLMs for test generation
- Another engineer "known for writing thorough tests" saved "weeks of time"
- Collectively, engineers have "saved hundreds of hours" that has been reallocated to feature development

These claims should be viewed with some caution as they come from a company blog post and aren't independently verified. However, the efficiency gains for test generation are plausible given the nature of the task—tests often follow predictable patterns and benefit from comprehensive coverage of edge cases, which LLMs can enumerate systematically.

## Important Caveats and Considerations

The case study is notably balanced in presenting limitations and considerations, which adds credibility:

- **Iterative refinement is often necessary**: LLMs may miss edge cases, generate non-compiling code, or not match codebase standards
- **Test logic must be verified**: LLMs can produce incorrect tests. One engineer encountered issues with incorrect output due to improper formatting
- **Examples are critical**: The quality of generated tests depends heavily on the quality of example tests provided
- **Not all code needs tests**: The team advises against over-testing, particularly for simple glue code or basic UI components (unless you maintain a component library)
- **Code structure matters**: Difficulty in generating good tests may indicate the code itself is poorly structured or overly complex

## LLMOps Implications

This case study illustrates several LLMOps principles:

**Model selection based on use case requirements**: For batch/offline tasks where latency is not critical, using the most capable (and potentially most expensive) models makes sense.

**Prompt engineering as a core competency**: The structured prompt template represents institutional knowledge about how to effectively use LLMs for this specific task. The emphasis on examples as "your most important way to drive the LLM to do what you want" reflects best practices in prompt engineering.

**Human-in-the-loop workflows**: The approach explicitly requires human review and iteration. LLM output is treated as a starting point, not a final product. This pragmatic approach reduces risk while still capturing efficiency gains.

**Internal developer tooling as LLM application**: This is not a customer-facing LLM application but rather an internal productivity tool. Such use cases may have different requirements around reliability, latency, and cost compared to production customer services.

**Quality gates remain important**: Despite using LLMs, the fundamental engineering practices remain: tests must compile, run correctly, and be reviewed before merging. The LLM accelerates the creation process but doesn't eliminate the need for verification.

## Critical Assessment

While the case study presents a compelling use case for LLMs in software development, a few points merit consideration:

The claimed time savings are impressive but vague. "Hundreds of hours" across an engineering team is difficult to verify, and the comparison baseline isn't specified. How long would these tests have taken to write manually?

The example provided is relatively simple—a pure function with clear inputs and outputs. Real-world code often involves more complex dependencies, side effects, and state management that may be harder for LLMs to test effectively.

The case study comes from a company blog and serves partly as a showcase of engineering culture and partly as a recruiting tool ("We're hiring"). This context doesn't invalidate the claims but suggests they should be interpreted carefully.

Overall, this case study represents a practical, grounded application of LLMs to improve engineering productivity. The approach is reproducible, the limitations are acknowledged, and the benefits are plausible if not rigorously quantified.