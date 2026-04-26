---
title: "AI-Powered Code Review System at Scale"
slug: "ai-powered-code-review-system-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "classification"
  - "high-stakes-application"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "few-shot"
  - "semantic-search"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "cicd"
  - "monitoring"
  - "databases"
  - "microservices"
  - "devops"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "security"
  - "anthropic"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Uber"
summary: "Uber developed uReview, an AI-powered code review platform designed to address the challenges of reviewing tens of thousands of code changes weekly. The system uses a modular, multi-stage GenAI architecture with specialized assistants to identify bugs, security vulnerabilities, and coding standard violations. Through sophisticated prompt chaining, filtering, and validation mechanisms, uReview achieves a 75% usefulness rate among engineers while analyzing over 90% of approximately 65,000 weekly diffs. The platform saves an estimated 39 developer years annually by providing timely, high-quality automated feedback that complements human review, with 65% of posted comments being addressed by developers."
link: "https://www.uber.com/us/en/blog/ureview/"
year: 2025
seo:
  title: "Uber: AI-Powered Code Review System at Scale - ZenML LLMOps Database"
  description: "Uber developed uReview, an AI-powered code review platform designed to address the challenges of reviewing tens of thousands of code changes weekly. The system uses a modular, multi-stage GenAI architecture with specialized assistants to identify bugs, security vulnerabilities, and coding standard violations. Through sophisticated prompt chaining, filtering, and validation mechanisms, uReview achieves a 75% usefulness rate among engineers while analyzing over 90% of approximately 65,000 weekly diffs. The platform saves an estimated 39 developer years annually by providing timely, high-quality automated feedback that complements human review, with 65% of posted comments being addressed by developers."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-code-review-system-at-scale"
  ogTitle: "Uber: AI-Powered Code Review System at Scale - ZenML LLMOps Database"
  ogDescription: "Uber developed uReview, an AI-powered code review platform designed to address the challenges of reviewing tens of thousands of code changes weekly. The system uses a modular, multi-stage GenAI architecture with specialized assistants to identify bugs, security vulnerabilities, and coding standard violations. Through sophisticated prompt chaining, filtering, and validation mechanisms, uReview achieves a 75% usefulness rate among engineers while analyzing over 90% of approximately 65,000 weekly diffs. The platform saves an estimated 39 developer years annually by providing timely, high-quality automated feedback that complements human review, with 65% of posted comments being addressed by developers."
notion:
  pageId: "34ef8dff-2538-81db-a2ee-dc9a2c80b18a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T13:11:06Z"
---

## Overview

Uber's uReview represents a sophisticated production deployment of large language models for automated code review at massive scale. The platform was built to address the growing challenges of traditional peer code review in an environment processing approximately 65,000 code changes (diffs) per week across six monorepos covering Go, Java, Android, iOS, TypeScript, and Python. The fundamental problem Uber faced was reviewer overload combined with the increasing volume of code from AI-assisted development, which led to missed errors, slower feedback loops, and ultimately production incidents and wasted resources.

The core innovation of uReview is not simply applying LLMs to code review, but rather building a production-grade system that addresses the critical challenge of false positives—both from LLM hallucinations and from technically correct but contextually irrelevant comments. The system achieves a 75% usefulness rating from engineers and sees 65% of its comments addressed, significantly outperforming the 51% rate at which human-written comments are considered bugs and addressed. The platform currently analyzes over 90% of weekly diffs and provides feedback within a median of 4 minutes, saving an estimated 1,500 hours weekly or approximately 39 developer years annually.

## System Architecture and Pipeline

uReview employs a modular, multi-stage architecture built on prompt chaining that decomposes the code review task into four distinct sub-tasks: comment generation, filtering, validation, and deduplication. This architectural decision is crucial from an LLMOps perspective because it allows each stage to evolve independently and enables targeted optimization of different aspects of the system.

The ingestion and preprocessing stage begins when a developer submits a change on Uber's Phabricator code review platform. The system first filters out low-signal targets such as configuration files, generated code, and experimental directories. For eligible files, uReview constructs structured prompts that include rich contextual information such as nearby functions, class definitions, and import statements. This context engineering is critical for enabling the language model to produce precise and relevant suggestions rather than generic advice.

The comment generation phase uses a pluggable assistant framework where each assistant specializes in a specific class of issues. This design pattern reflects a key LLMOps insight: rather than trying to build a single monolithic prompt that handles all review scenarios, specialized assistants with customized prompts and context perform better. Currently, uReview operates three assistants: the Standard Assistant for bugs, incorrect exception handling, and logic flaws; the Best Practices Assistant for Uber-specific coding conventions that references a shared registry of style rules; and the AppSec Assistant targeting application-level security vulnerabilities. The pluggable nature allows independent development and evaluation of each assistant type.

## Multi-Layered Quality Filtering

The post-processing and quality filtering stages represent perhaps the most critical LLMOps innovation in uReview. The team learned through production experience that simple standalone prompting results in unacceptable levels of false positives and low-value true positives that developers ignore. The system implements multiple defensive layers to address this challenge.

First, a secondary prompt evaluates each generated comment's quality and assigns a confidence score. Critically, this grading prompt is customized for each assistant type, and confidence thresholds for pruning are set at a fine-grained level per assistant, per programming language, and per comment category. This granular approach reflects the reality that what constitutes a useful comment varies significantly across these dimensions. The system pairs Anthropic Claude-4-Sonnet as the primary comment generator with OpenAI o4-mini-high as the review grader, a combination that achieved the highest F1 score in empirical benchmarks.

Second, a semantic similarity filter merges overlapping suggestions to avoid presenting developers with repetitive feedback. This addresses the tendency of LLMs to generate multiple variations of essentially the same comment.

Third, a category classifier tags each comment with fine-grained categories such as "correctness:null-check" or "readability:naming" and suppresses categories that have historically low developer value. This feedback-driven suppression mechanism is a key element of the continuous improvement loop.

## Feedback Collection and Continuous Evaluation

uReview implements sophisticated feedback collection mechanisms that are essential for maintaining and improving the system over time. Developers can rate each comment as "Useful" or "Not Useful" and optionally add explanatory notes. All comments along with their metadata—including assistant origin, category, confidence score, and developer feedback—are streamed to Apache Hive via Apache Kafka. This data infrastructure supports long-term tracking, A/B testing experimentation, and operational dashboards.

The evaluation strategy combines both automated and manual methods. For automated evaluation, the system employs a clever approach: it re-runs uReview five times on the final commit to determine whether a posted comment has been addressed. Because LLM outputs are stochastic, a single re-run might miss a lingering issue or incorrectly flag one that's already fixed. Five runs represents the minimal count that virtually eliminates missed detections while keeping cost and latency manageable. A comment is considered addressed if none of the five re-runs reproduce a semantically similar comment, with appropriate adjustments for cases where code referenced in the comment has been deleted.

For manual evaluation, Uber maintains a curated benchmark of commits with known issues and human-labeled annotations. This golden dataset allows evaluation of precision, recall, and F1 scores against ground truth. The advantage of automated feedback is scale—it runs on thousands of production commits daily. The advantage of the manual benchmark is that it enables local iteration and testing of new features before production deployment. Both feedback mechanisms inform ongoing adjustments to confidence thresholds, prompts, and filtering logic.

## Model Selection and Empirical Evaluation

Uber conducted rigorous empirical evaluation of different LLM configurations on their curated benchmark suite. The testing compared multiple frontier models including Anthropic Claude-4-Sonnet, OpenAI GPT-4.1, O3, O1, and o4-mini-high, Meta Llama-4, and DeepSeek R1. The evaluation computed standard metrics of precision, recall, and F-score by comparing uReview's identified issues against ground-truth annotations.

The optimal configuration paired Claude-4-Sonnet as the primary comment generator with o4-mini-high as the review grader, achieving the highest F1 score across all tested setups. The runner-up configuration used Claude-4-Sonnet with GPT-4.1 as the grader, scoring 4.5 points below the leader. This empirical approach to model selection represents LLMOps best practice: rather than assuming newer or larger models are better, Uber systematically evaluates configurations on their specific use case and metrics. The team periodically re-evaluates newer models using this framework and deploys the combination with the highest F1 score.

## Deployment and Integration

uReview is deployed across all six of Uber's monorepos and reviews every commit as part of the continuous integration process. The median review time of 4 minutes enables developers to receive automated feedback before human reviewers engage with the code. This timing is strategically important: by surfacing issues early, uReview allows code authors to address bugs and style violations before consuming human reviewer time.

The system posts validated comments directly inline on the Phabricator platform, integrating seamlessly into existing developer workflows. This integration decision reflects the understanding that AI tools must meet developers where they work rather than requiring them to adopt new tools or processes. The team explicitly chose to implement AI review at CI time rather than relying solely on IDE-based tools because they have less control over what developers do locally—developers may not use IDE AI features or may ignore warnings.

## Key Lessons and Design Principles

Uber learned several critical lessons that offer broader insights for LLMOps practitioners. First and most importantly, precision is more valuable than volume. Early in development, the team discovered that comment quality matters far more than quantity. Developers rapidly lose confidence in tools that generate low-quality or irrelevant suggestions. By focusing on delivering fewer but more useful comments through aggressive filtering and confidence scoring, uReview built the trust necessary for widespread adoption.

Second, real-time feedback mechanisms must be built into the system from the beginning, not added later. The simple rating links embedded in every comment, combined with automated evaluation of whether comments were addressed, enabled feedback collection at scale. Linking this feedback to fine-grained metadata about language, comment category, and assistant variant uncovered patterns that enabled targeted improvements.

Third, guardrails and system architecture are just as important as prompt engineering. Even with high-performing models, single-shot prompting proved insufficient. Unfiltered outputs led to hallucinations, duplicates, and inconsistent quality. The multi-stage chained prompt architecture—one step to generate, another to grade, others to filter and consolidate—proved essential for reliability.

Fourth, developers showed clear preferences about comment types. Readability nits, minor logging tweaks, low-impact performance optimizations, and stylistic issues consistently received poor ratings. In contrast, correctness bugs, missing error handling, and coding best-practice violations—especially when paired with examples or links to internal documentation—scored well. This insight enabled uReview to focus on high-signal categories and avoid developer fatigue.

Fifth, the team observed that LLMs are currently better at catching code-level bugs than assessing system design. uReview today only has access to the source code itself, not to other artifacts like past pull requests, feature flag configurations, database schemas, or technical documentation. This limitation constrains its ability to correctly assess overall system correctness and review architectural decisions. However, the team anticipates this may change with tools like Model Context Protocol (MCP) servers that can provide access to these additional resources.

## Rollout Strategy and Trust Building

Uber introduced uReview through a phased rollout approach, deploying one team or assistant at a time and instrumenting each stage with comprehensive metrics including precision-recall dashboards, comment-address-rate logs, and user-reported false-positive counts. This gradual approach enabled rapid, data-driven iteration while limiting the blast radius of potential regressions.

When early users surfaced issues—such as noisy stylistic suggestions or missed security checks—the team A/B tested candidate fixes, tuned thresholds, and shipped improvements within a day. Early users provided precise feedback that could be correlated with quantitative metrics to make objective go/hold decisions for each release. This methodology proved critical for building credibility, adjusting based on real-world usage patterns, and scaling with confidence.

## Cost Considerations and Build vs. Buy

Uber chose to build an in-house solution rather than adopt third-party AI code review tools for several reasons. First, most third-party tools require code to be hosted on GitHub, but Uber uses Phabricator as its primary code review platform. This architectural constraint limited the ability to deploy off-the-shelf solutions that are tightly coupled with GitHub.

Second, when evaluating third-party tools on Uber code, the team found they suffered from three main issues: excessive false positives, low-value true positives, and inability to interact with internal Uber systems. uReview avoids these problems through its prioritization of precision, integrated feedback loops, specialization to patterns that work well at Uber specifically, and ability to pull information from internal systems.

Third, at Uber's scale of 65,000 diffs per month, the AI-related costs of running uReview are an order of magnitude less than what typical third-party tools charge. This cost differential becomes significant at scale and justified the investment in building and maintaining a custom solution.

## Positioning Relative to Other Tools

The team explicitly discussed how uReview relates to other developer tools in the ecosystem. Regarding traditional linters and static analysis tools, they maintain that for simple syntactic patterns, linters remain accurate, reliable, and cheap—and should continue to be used. However, certain properties are hard to check with traditional static analysis. For example, the Uber Go style guide recommends using the time library for time-related operations, which requires semantic understanding to recognize that a particular integer variable represents time. LLMs excel at these semantically complex checks that are impractical for conventional linters.

Regarding IDE-based AI code review tools and extensions, Uber still wants AI reviews at the CI platform level because they have limited control over local developer behavior. Developers may not use IDE AI features or may ignore warnings. This philosophy mirrors the traditional practice of running builds and tests at CI time in addition to making them available locally, ensuring a consistent quality gate regardless of individual developer practices.

## Future Directions

Looking ahead, Uber plans to expand uReview in several directions. They aim to support richer context beyond source code, cover additional review categories such as performance analysis and test coverage assessment, and develop reviewer-focused tools to assist with code understanding and risk identification. These efforts aim to push the boundaries of AI-assisted code review while maintaining engineers firmly in control of decision-making. The emphasis on augmentation rather than replacement reflects a mature understanding of where AI tools add value and where human judgment remains essential.
