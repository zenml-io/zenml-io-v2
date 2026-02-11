---
title: "Building a Systematic LLM Evaluation Framework from Scratch"
slug: "building-a-systematic-llm-evaluation-framework-from-scratch"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67934837d17a34c8d1cfd03b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:58:19.457Z"
  createdOn: "2025-01-24T07:58:47.843Z"
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "structured-output"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "system-prompts"
  - "monitoring"
  - "documentation"
  - "reliability"
  - "postgresql"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Coda"
summary: "Coda's journey in developing a robust LLM evaluation framework, evolving from manual playground testing to a comprehensive automated system. The team faced challenges with model upgrades affecting prompt behavior, leading them to create a systematic approach combining automated checks with human oversight. They progressed through multiple phases using different tools (OpenAI Playground, Coda itself, Vellum, and Brain Trust), ultimately achieving scalable evaluation running 500+ automated checks weekly, up from 25 manual evaluations initially."
link: "https://www.youtube.com/watch?v=nqLDfjKabsI"
year: 2023
seo:
  title: "Coda: Building a Systematic LLM Evaluation Framework from Scratch - ZenML LLMOps Database"
  description: "Coda's journey in developing a robust LLM evaluation framework, evolving from manual playground testing to a comprehensive automated system. The team faced challenges with model upgrades affecting prompt behavior, leading them to create a systematic approach combining automated checks with human oversight. They progressed through multiple phases using different tools (OpenAI Playground, Coda itself, Vellum, and Brain Trust), ultimately achieving scalable evaluation running 500+ automated checks weekly, up from 25 manual evaluations initially."
  canonical: "https://www.zenml.io/llmops-database/building-a-systematic-llm-evaluation-framework-from-scratch"
  ogTitle: "Coda: Building a Systematic LLM Evaluation Framework from Scratch - ZenML LLMOps Database"
  ogDescription: "Coda's journey in developing a robust LLM evaluation framework, evolving from manual playground testing to a comprehensive automated system. The team faced challenges with model upgrades affecting prompt behavior, leading them to create a systematic approach combining automated checks with human oversight. They progressed through multiple phases using different tools (OpenAI Playground, Coda itself, Vellum, and Brain Trust), ultimately achieving scalable evaluation running 500+ automated checks weekly, up from 25 manual evaluations initially."
---

## Overview

Coda is an all-in-one workspace platform that combines the flexibility of documents with the structure of spreadsheets and the power of applications. The company integrates AI capabilities throughout their product, including an AI assistant for content generation, AI-powered table operations (classification, content generation based on row data), and a RAG-based question-answering system that allows users to query content within their documents. This case study, presented by Kenny, a software engineer on Coda's AI team, details their journey building a comprehensive GenAI evaluation framework from the ground up, starting in 2023 when ChatGPT "rocked the world."

## The Core Challenge

The catalyst for Coda's evaluation journey came in March 2023 when OpenAI released the GPT-3.5 Turbo model, which was both faster and cheaper than the previous DaVinci model. When testing the new model, the team discovered that all their existing prompts no longer worked as expected. The responses became "much more conversational rather than instructional." For example, when a user asked AI to write a blog post, instead of simply generating the content, the new model would respond with "Sure, here is the blog post you're looking for..." followed by the content, and then end with "let me know what you think."

This experience highlighted a fundamental truth about working with LLMs in production: models are non-deterministic by nature and can change outside of the application developer's control. Even when model providers upgrade their offerings, the behavioral changes can be dramatic and unexpected. The team recognized they needed a systematic approach to evaluate how generative AI behaves so they could maintain confidence that AI output quality would remain consistent as models and prompts changed over time.

## The Four-Phase Evolution Journey

### Phase 1: OpenAI Playground

In early 2023, before system prompts or chat conversations were standard, the team used the OpenAI Playground interface with the DaVinci model. This approach was excellent for quick experimentation and iteration, and it was accessible to non-engineers like designers and PMs who could participate in prompt engineering efforts. However, it scaled poorly beyond approximately 10 data points due to the manual copy-and-paste workflow required. The approach also lacked the ability to grade AI outputs or track behavior changes over time.

### Phase 2: Using Coda to Evaluate Coda

Leveraging Coda's existing integration with OpenAI, the team built an internal "prompt playground" using their own platform. They created a table where each row represented a benchmark case. One column combined the system prompt with benchmark data and fetched responses from the AI, while another column provided a way to perform manual evaluation. This eliminated much of the copy-paste work and gave the team a way to compare performance between different prompts or models.

However, this approach hit limitations when OpenAI introduced the conversational model structure (GPT-3.5 Turbo) in March-April 2023. The change from single user prompts to conversations with system prompts significantly increased the maintenance burden. With fewer than five engineers on the team, they decided the time spent maintaining the tool would be better spent improving AI quality—a classic build-versus-buy decision.

### Phase 3: Adopting Vellum

The team's first AI vendor purchase was Vellum, which addressed their prompt playground needs. Vellum allowed them to define and share datasets and prompts with different team members, enabling collaborative evaluation and prompt engineering. The interface was similar to both the OpenAI Playground and their Coda-based solution, making it accessible to non-technical team members. Each column represented a different prompt, each row a benchmark record, and running evaluations would combine prompts with benchmark data to get AI responses that could be manually rated (green for pass, red for fail).

However, as the number of supported features grew, they encountered new limitations. First, their evaluation was decoupled from application code—they were evaluating prompts in isolation, but the actual application code performed additional manipulation. This led to situations where playground evaluations passed but production behavior differed significantly due to structural differences in how prompts were assembled. Second, the team wanted to automate some of the manual "vibe checks" that were consuming increasing amounts of time.

### Phase 4: Braintrust for Scaled Evaluation

The team began integrating automated evaluation workflows as part of their integration test suite, running evaluations similar to how they ran tests. Initially, they exported results to Snowflake and used Mode for visualization, but this created another maintenance burden with SQL and reporting. Braintrust emerged as the solution in mid-2023, providing a robust API where evaluation results could be uploaded and visualized automatically.

Braintrust provided timeline views showing score trends over time (with 1 being good and 0 being failure), aggregated job-level scores, and the ability to drill down into specific benchmark performance. For example, when evaluating an "extract action items" feature, they could identify failing benchmarks—such as one where a chat transcript intentionally contained zero action items, testing whether the AI correctly returned nothing rather than hallucinating action items.

The team continues to actively use Braintrust for scaled evaluation due to its robust API, built-in reporting capabilities, and flexibility to support different scoring and evaluation criteria. The speaker notes that while Braintrust is very engineering-focused, Vellum might be better suited for users less comfortable with JSON or YAML manipulation.

## Quantified Growth and Scale

The team's evaluation capabilities grew dramatically over approximately one year:

- Features supported: from 0 to 15+
- Engineers involved: from 1 to 5+
- Automated checks: from 0 to 50+
- Weekly evaluation runs: from 25 (manual) to 500+ (automated)
- Benchmark data points: from 25 examples in a Coda table to 5,000+ data points

## Three Key Lessons Learned

### Lesson 1: Keep Evaluation Close to Your Code

When evaluations are done in playgrounds, prompts must be kept in sync with the codebase through copy-paste, leading to divergence between what's evaluated and what users actually see. By keeping evaluation as close to the application code as possible, teams can be confident that evaluations reflect actual user experience. Practically, this means if your application is written in Node.js, consider implementing evaluation in Node rather than defaulting to Python-based ML libraries.

### Lesson 2: Human in the Loop is Essential

While automated checks are valuable and should be added as you scale (checking correct answers, response formatting, etc.), human reviewers serve as "final gatekeepers" to catch edge cases. The speaker provided a concrete example: when upgrading from the November version of GPT-4 Turbo to the January version, they observed that instead of returning markdown as specified, the AI was wrapping entire responses in triple-backtick code blocks—behavior that would never have been anticipated based on previous models.

The speaker frames this as a flywheel: human review identifies edge cases, which get converted into automated checks, strengthening the evaluation framework over time. A practical tip offered is to run the same prompt on two different models (ideally from different vendors) and compare outputs—the preferences that emerge ("I prefer Model A because of XYZ") can be turned into automated checks.

### Lesson 3: Your Evaluation is Only as Good as Your Benchmark Dataset

Even with extensive automated checks and human review, if benchmark data doesn't cover real-world use cases, it won't surface issues. Building good benchmark datasets requires multiple approaches: starting with PMs and designers to identify "hero use cases," using initial benchmarks as seeds to generate variations with AI, collecting feedback from alpha and beta users, consulting customer-facing teammates who have firsthand experience with customer needs, and leveraging internal usage data from development and staging environments to identify gaps.

The speaker acknowledges that curating benchmark datasets is one of their biggest pain points, sometimes taking hours or even a full day to determine the right use cases and edge cases for a new feature. There are no hard rules—you simply have to think through how the system could break. The investment, however, pays off over time.

## Practical Getting-Started Advice

For those just starting with GenAI evaluation, the speaker recommends: taking existing application prompts, signing up for Braintrust, creating benchmark data, running evaluations to establish a baseline, and then gradually moving playground evaluation closer to application code. Datasets defined in Braintrust can be pulled back via API to run against the actual application, so early work is not wasted.

The core message is to start early, even if small—"N equals 10 is a great start"—and iterate on benchmark datasets over time. The non-deterministic nature of LLMs and the reality that models change outside your control make systematic evaluation not just useful but essential for maintaining quality in production AI applications.