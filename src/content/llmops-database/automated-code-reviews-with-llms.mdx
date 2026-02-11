---
title: "Automated Code Reviews with LLMs"
slug: "automated-code-reviews-with-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad79758519648e4adde83"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:20.126Z"
  createdOn: "2025-12-23T17:55:35.641Z"
llmopsTags:
  - "code-generation"
  - "poc"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "fastapi"
  - "postgresql"
  - "cicd"
  - "monitoring"
  - "api-gateway"
  - "orchestration"
  - "open-source"
  - "openai"
industryTags: "e-commerce"
company: "Faire"
summary: "Faire, an e-commerce marketplace connecting retailers with brands, implemented an LLM-powered automated code review pipeline to enhance developer productivity by handling generic code review tasks. The solution leverages OpenAI's Assistants API through an internal orchestrator service called Fairey, which uses RAG (Retrieval Augmented Generation) to fetch context-specific information about pull requests including diffs, test coverage reports, and build logs. The system performs various automated reviews such as enforcing style guides, assessing PR descriptions, diagnosing build failures with auto-fix suggestions, recommending test coverage improvements, and detecting backward-incompatible changes. Early results demonstrated success with positive user satisfaction and high accuracy, freeing up engineering talent to focus on more complex review aspects like architecture decisions and long-term maintainability."
link: "https://craft.faire.com/automated-code-reviews-with-llms-cf2cc51bb6d3"
year: 2024
seo:
  title: "Faire: Automated Code Reviews with LLMs - ZenML LLMOps Database"
  description: "Faire, an e-commerce marketplace connecting retailers with brands, implemented an LLM-powered automated code review pipeline to enhance developer productivity by handling generic code review tasks. The solution leverages OpenAI's Assistants API through an internal orchestrator service called Fairey, which uses RAG (Retrieval Augmented Generation) to fetch context-specific information about pull requests including diffs, test coverage reports, and build logs. The system performs various automated reviews such as enforcing style guides, assessing PR descriptions, diagnosing build failures with auto-fix suggestions, recommending test coverage improvements, and detecting backward-incompatible changes. Early results demonstrated success with positive user satisfaction and high accuracy, freeing up engineering talent to focus on more complex review aspects like architecture decisions and long-term maintainability."
  canonical: "https://www.zenml.io/llmops-database/automated-code-reviews-with-llms"
  ogTitle: "Faire: Automated Code Reviews with LLMs - ZenML LLMOps Database"
  ogDescription: "Faire, an e-commerce marketplace connecting retailers with brands, implemented an LLM-powered automated code review pipeline to enhance developer productivity by handling generic code review tasks. The solution leverages OpenAI's Assistants API through an internal orchestrator service called Fairey, which uses RAG (Retrieval Augmented Generation) to fetch context-specific information about pull requests including diffs, test coverage reports, and build logs. The system performs various automated reviews such as enforcing style guides, assessing PR descriptions, diagnosing build failures with auto-fix suggestions, recommending test coverage improvements, and detecting backward-incompatible changes. Early results demonstrated success with positive user satisfaction and high accuracy, freeing up engineering talent to focus on more complex review aspects like architecture decisions and long-term maintainability."
---

## Overview and Business Context

Faire operates an e-commerce marketplace platform connecting independent retailers with wholesale brands. Following the launch of ChatGPT and OpenAI's API offerings, Faire assembled an AI Foundations team and conducted a three-day AI hackathon that generated 92 project submissions exploring various LLM-powered features. One standout project, initially called "Backward Compatibility Cop," evolved into a production automated code review system that represents a sophisticated implementation of LLMs in the software development lifecycle.

The business case for automated code reviews stems from Faire's belief in rigorous code review practices. While many aspects of code review require deep project context, there exists a substantial category of generic review requirements that can be evaluated without specialized knowledge—including PR title and description quality, test coverage adequacy, style guide enforcement, and identification of breaking changes across service boundaries. Automating these generic aspects allows human reviewers to focus on higher-value activities like architectural decisions, product requirement validation, and long-term maintainability concerns.

## Technical Architecture: Fairey Orchestrator Service

At the heart of Faire's LLM operations is Fairey, an internal LLM orchestrator service that manages chat requests and breaks them down into the necessary steps for producing responses. This architecture demonstrates a mature approach to LLMOps by creating a centralized service layer rather than embedding LLM calls throughout the codebase.

Fairey is heavily integrated with OpenAI's Assistants APIs, which provides several operational advantages. The service includes a custom UI for managing AI assistants, allowing engineers to iterate on assistant instructions and configure available functions without modifying code. This separation of concerns between infrastructure and configuration is a best practice in LLMOps, enabling faster iteration and experimentation.

The orchestrator implements a function-calling pattern where assistants can invoke registered callbacks to fetch additional information. This is critical for the RAG implementation, as it allows the LLM to determine dynamically which information it needs rather than receiving all potentially relevant data upfront. Each function has a callback defined in the orchestration service that executes whenever GPT determines it's necessary. The available functions for code review include fetching GitHub diffs, pull request metadata, code coverage reports from CI artifacts, and full file contents.

## RAG Implementation for Context-Specific Reviews

Faire's RAG implementation represents a pragmatic approach to providing LLMs with company-specific and case-specific information. While LLMs are trained on broad information, they lack access to proprietary data and real-time information about specific code changes under review. The text mentions that Faire has also experimented with fine-tuning open source models like Llama 3 for other use cases, but for code reviews, they rely primarily on RAG with OpenAI models.

The RAG architecture uses function calling to fetch context on-demand rather than stuffing all information into the initial prompt. This approach has several advantages: it reduces token consumption, allows the LLM to be selective about what information it needs, and makes the system more scalable as context requirements grow. The functions available include capabilities to fetch GitHub diffs, pull request metadata, code coverage reports in lcov format, and full file contents. This gives the LLM access to comprehensive information about the code changes while maintaining efficient token usage.

## Review Lifecycle and Integration

The automated review system is event-driven, integrating with GitHub's webhook system to receive payloads whenever significant events occur on pull requests. Fairey reacts to these webhooks by checking whether any automatic reviews meet their triggering criteria for the specific pull request. Criteria can include programming language filters, specific diff content patterns, or CI check outcomes.

When a review is triggered, Fairey orchestrates interactions with OpenAI's Assistant APIs to perform the analysis. The workflow involves the LLM potentially making multiple function calls to gather necessary context, then producing a review output. Before posting to GitHub, Fairey validates that the output is useful and actionable. Reviews typically include comments, hints, and may even include specific code change suggestions using GitHub's suggestion feature.

To prevent duplicate reviews, Fairey embeds hidden metadata in each review comment, allowing the system to track what has already been covered. This metadata also enables potential future functionality like continuing previous review threads or using earlier review outputs as inputs to incremental reviews—though the text doesn't specify if this capability is currently implemented.

## Test Coverage Review Deep Dive

The test coverage review provides an illuminating example of how the automated review system works in practice. Faire's frontend codebases use Jest for unit testing with enforced minimum coverage requirements for user-facing code. Coverage is computed incrementally in pull requests using Jest's `--changedSince` flag, which executes only tests dependent on changed source files, along with the `--coverage` flag to generate coverage reports viewable in Faire's internal development portal.

The test coverage review triggers when GitHub reports that the "Test coverage" check run has completed with a "failure" outcome, indicating that incremental coverage fell below the required threshold. This typically happens when authors add new source code without corresponding tests or create new code branches not covered by existing tests.

The assistant for test coverage review has system-level instructions identifying it as an expert React and TypeScript programmer, with specific guidance about how test files are organized in Faire's codebases (in `__tests__/` folders with `.test.ts` suffixes). The instructions explain how to use lcov coverage reports to identify low-coverage areas. The prompt template for each specific review directs the assistant to identify uncovered changes and suggest test cases, using existing test files as reference to avoid duplicating already-covered cases.

The function-calling pattern allows the LLM to fetch exactly what it needs: it can examine the diff to understand what changed, retrieve the coverage report to identify gaps, and load existing test files to understand testing patterns and avoid redundant suggestions. The resulting review posts directly to the pull request with actionable suggestions for improving test coverage.

## Evaluation Strategy: Quantitative and Qualitative

Faire demonstrates mature LLMOps practices through their dual evaluation approach. The company acknowledges a fundamental challenge with LLMs: while they're incredibly flexible with inputs, they produce varied outputs. GPT models are predictive and can make mistakes, hallucinate, or produce verbose or unrelated content. Faire addresses this with both quantitative and qualitative assessment.

For quantitative evaluation, Faire employs LLM evaluation frameworks including Gentrace, CometLLM, and Langsmith. Whenever a review is performed, inputs and outputs are forwarded to these evaluation tools. Each input/output pair can become a test case, and as engineers iterate on the review system—tweaking prompts, changing models, adjusting data fetching—they re-run the review pipeline across all test cases. Notably, they use an LLM to assess the quality of review outputs, essentially having the LLM grade itself (or another LLM instance). While this approach has limitations, it provides scalable automated assessment that can track improvements or regressions.

For qualitative evaluation, Faire integrates with DX, a platform for measuring developer productivity. DX is notified whenever a review is performed and solicits survey responses from pull request authors. This direct user feedback—both positive and negative—is plumbed back into Gentrace where it serves as a filtering signal for identifying good test cases. This creates a feedback loop where real user experience informs the development of evaluation benchmarks.

The combination of automated LLM-based scoring and human feedback provides balanced assessment. Automated scoring enables rapid iteration and regression detection, while human feedback ensures the system actually delivers value to end users and catches issues that automated evaluation might miss.

## Fixtures for Reproducible Iteration

Faire implemented a "fixtures" feature that addresses a practical challenge in iterating on pull request reviews: the transient nature of PRs means that by the time an engineer is ready to iterate on review behavior, the pull request information may have changed. The fixtures feature saves function call outputs as snapshots for reuse in later runs.

The implementation extracts results from function calls in the OpenAI thread history, saves them as fixture files uploaded to storage, and uses these fixtures as overrides when running reviews later. When replaying a review scenario, Fairey reads the fixture files and provides their contents to ChatGPT when it invokes functions, ensuring consistent inputs for testing prompt changes or model updates. This capability is essential for systematic improvement of review quality, enabling controlled experiments where only one variable changes at a time.

## Production Review Types and Early Impact

The system currently performs several types of automated reviews beyond test coverage, including style guide enforcement, assessment of PR title and description quality, diagnosis of build failures with auto-fix actions, and detection of backward-incompatible changes across service boundaries. Each review type required refinement to achieve what Faire calls the "trifecta of C's"—consistent, concise, and correct outputs.

The company reports success measured by positive user satisfaction and high accuracy, though specific metrics are not provided in the text. The article notes that each new review type initially shows varied output quality, and achieving reliable results requires "heavy refinement of the input content and structure, a broad set of test cases, and use of more complex prompting techniques such as self-eval and CoT (Chain-of-Thought)." This candid acknowledgment reflects the reality of production LLM systems: initial results may be promising but reaching production quality requires substantial iteration.

The stated value proposition centers on empowering productivity by streamlining the review process, reducing review latency for simpler problems, and allowing engineers to focus on complex aspects like product requirements, architecture, maintainability, and code reuse. The company positions this not as replacing human reviewers but as handling routine tasks to free up talent for higher-value work.

## Critical Assessment and LLMOps Maturity

While Faire presents their automated review system as a success, the text is essentially promotional content from the company's engineering blog, and certain claims should be evaluated critically. The article provides limited concrete metrics on actual impact—we know there were 92 hackathon projects and that user satisfaction is "positive," but specific adoption rates, time savings, or code quality improvements are not quantified.

The architecture demonstrates several LLMOps best practices: centralized orchestration through Fairey rather than scattered LLM calls, separation of configuration from code through the assistant management UI, comprehensive evaluation framework with both automated and human feedback, and fixture-based reproducibility for iteration. The use of multiple evaluation tools (Gentrace, CometLLM, Langsmith) suggests the team is still exploring which provides the best fit rather than having settled on a standard approach.

The RAG implementation via function calling is architecturally sound, though the text doesn't address important production concerns like rate limiting, cost management, latency optimization, or handling of API failures. The GitHub webhook integration creates tight coupling with GitHub specifically, which may limit portability but is reasonable given Faire's infrastructure.

The acknowledgment that achieving "consistent, concise, and correct" outputs requires "heavy refinement" and advanced prompting techniques like self-evaluation and chain-of-thought is refreshingly honest and aligns with the reality of production LLM systems. The fixtures feature demonstrates practical engineering to address a real iteration challenge. The dual evaluation approach combining automated LLM-based assessment with human feedback through DX shows mature thinking about validation.

One potential concern is the use of LLMs to evaluate LLM outputs, which can create echo chambers where the evaluation model reinforces the biases of the reviewed model. The human feedback loop through DX partially mitigates this, but the text doesn't explain how conflicts between automated scores and human feedback are resolved or weighted.

The system appears to be in active development rather than a mature, stable platform. The mention of "room for growth" and ongoing refinement of each review type suggests this is an evolving capability. The integration of multiple tools and the custom development required indicate significant engineering investment, which may not be feasible for all organizations.

Overall, Faire's automated code review system represents a sophisticated production deployment of LLMs with thoughtful architecture, proper evaluation practices, and realistic expectations about the effort required to achieve quality results. The case study provides valuable insights into practical LLMOps patterns while also illustrating the complexity and ongoing iteration required for successful LLM applications in production.