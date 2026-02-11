---
title: "LLM-Driven Developer Experience and Code Migrations at Scale"
slug: "llm-driven-developer-experience-and-code-migrations-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67725d27d0c14cfc374c7021"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:51:04.274Z"
  createdOn: "2024-12-30T08:43:19.199Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "high-stakes-application"
  - "fine-tuning"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "multi-agent-systems"
  - "langchain"
  - "fastapi"
  - "devops"
  - "cicd"
  - "monitoring"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "wandb"
  - "microsoft-azure"
  - "openai"
  - "google-gcp"
  - "amazon-aws"
industryTags: "tech"
company: "Uber"
summary: "Uber's Developer Platform team explored three major initiatives using LLMs in production: a custom IDE coding assistant (which was later abandoned in favor of GitHub Copilot), an AI-powered test generation system called Auto Cover, and an automated Java-to-Kotlin code migration system. The team combined deterministic approaches with LLMs to achieve significant developer productivity gains while maintaining code quality and safety. They found that while pure LLM approaches could be risky, hybrid approaches combining traditional software engineering practices with AI showed promising results."
link: "https://www.youtube.com/watch?v=jp-fBw07r7c&t=1s"
year: 2023
seo:
  title: "Uber: LLM-Driven Developer Experience and Code Migrations at Scale - ZenML LLMOps Database"
  description: "Uber's Developer Platform team explored three major initiatives using LLMs in production: a custom IDE coding assistant (which was later abandoned in favor of GitHub Copilot), an AI-powered test generation system called Auto Cover, and an automated Java-to-Kotlin code migration system. The team combined deterministic approaches with LLMs to achieve significant developer productivity gains while maintaining code quality and safety. They found that while pure LLM approaches could be risky, hybrid approaches combining traditional software engineering practices with AI showed promising results."
  canonical: "https://www.zenml.io/llmops-database/llm-driven-developer-experience-and-code-migrations-at-scale"
  ogTitle: "Uber: LLM-Driven Developer Experience and Code Migrations at Scale - ZenML LLMOps Database"
  ogDescription: "Uber's Developer Platform team explored three major initiatives using LLMs in production: a custom IDE coding assistant (which was later abandoned in favor of GitHub Copilot), an AI-powered test generation system called Auto Cover, and an automated Java-to-Kotlin code migration system. The team combined deterministic approaches with LLMs to achieve significant developer productivity gains while maintaining code quality and safety. They found that while pure LLM approaches could be risky, hybrid approaches combining traditional software engineering practices with AI showed promising results."
---

## Overview

This case study covers Uber's Developer Platform team's approximately two-year journey of integrating AI into their software development lifecycle. The presentation was delivered by Adam (a senior engineering manager) and Ty, who shared three distinct stories about applying LLMs to developer productivity challenges across Uber's massive codebase of over 100 million lines of code spread across six monorepos supporting different language platforms.

Uber has positioned itself to be "AI-driven" by creating a horizontal team called "AI Developer Experience" that brings together experts from each monorepo who understand the nuances of developer workflows across different languages. Importantly, these team members don't need to be ML experts—they focus on applying AI to solve developer problems. A separate team with ML expertise provides foundational capabilities like model hosting, fine-tuning, and a model gateway that other teams can build upon.

The company's AI journey began around October 2022 when they had zero AI projects in their hackathons. Every hackathon since has been focused on AI, demonstrating a deliberate skill-building progression from "exploring things and building toys" to "building tools that deliver impact."

## Story 1: In-House Coding Assistant (Lessons from Failure)

The first story is particularly valuable as a cautionary tale about the gap between AI MVPs and production systems. Uber had been using GitHub Copilot and hypothesized that fine-tuning their own model on their 100+ million lines of proprietary code could yield better acceptance rates.

### Initial Requirements and Architecture

They set ambitious requirements for their in-house solution:
- Must be "Uber aware" through fine-tuning on internal code and deep workflow integration
- Latency targets of less than one second for 100 tokens (critical for autocomplete UX)
- Cost-effective hosting
- Per-user analytics for understanding productivity impact
- Integration across all IDEs: Xcode for iOS, JetBrains for backend/Android, VS Code for others

The architecture involved local code context gathering, passing to internal proxies, which communicated with backend-hosted models fine-tuned on each of the six monorepos. Results underwent verification for syntactic correctness before display.

### Model Evaluation and Investment

They evaluated multiple LLMs including Starcoder and Code Llama. The project required significant investment across multiple engineering streams: IDE integration for each platform, model hosting infrastructure, fine-tuning pipelines, and service infrastructure for context fetching.

Their goals were to achieve approximately 10% improvement in acceptance rate over non-fine-tuned models while maintaining the latency requirements.

### Why They Killed It

After six months of work to reach V1, they made the difficult decision to pause the project. Key factors included:

- **Resource asymmetry**: Unlike Microsoft (Copilot) or Google (Gemini), they had relatively few engineers and couldn't compete on headcount with companies investing in this as a core business model
- **Constant catch-up**: Vendor solutions were continuously improving, leaving internal teams perpetually behind
- **Maintenance burden**: The team had to maintain the assistant alongside all other organizational projects

### Critical Lessons Learned

The team extracted several important lessons that apply broadly to LLMOps initiatives:

- **MVPs are deceptively easy**: Getting an exciting demo video is straightforward, but productionizing AI tools can be "incredibly difficult and expensive"
- **Latency requirements are hard to hit**: Real-time autocomplete expectations created challenging engineering constraints
- **User experience matters beyond model accuracy**: The full flow—UI experience, workflows, integrations—contributed significantly to overall project complexity
- **Cannibalization risk**: Adding another chat or hijacking autocomplete in an IDE where users already had Copilot created friction and risk

### Pivoting to Ecosystem Strategy

Rather than competing, Uber adopted an "ecosystem principle"—building on top of existing solutions rather than replacing them. They went all-in on GitHub Copilot, investing in evangelism, reducing friction, and automatically provisioning it in cloud developer environments.

From the abandoned project, they extracted several reusable components:
- Code context gathering infrastructure (applied to fixing data races in Go, linters in Java, crash fixes)
- Assistant proxy for telemetry collection from vendor products
- Fine-tuned LLMs repurposed for code review bots and other applications

They built on top of Copilot using the Chat Participants API to integrate their internal support bot "Genie," allowing developers to get context from Jira, design docs, and other internal resources without UI cannibalization.

### Developer Education as a Force Multiplier

Uber invested heavily in internal developer relations, finding that using these tools effectively requires education. They developed coursework and conducted worldwide workshops teaching best practices like iterating with the LLM rather than expecting correct answers on the first try, using chat participants, and providing relevant context.

This investment pushed adoption to around 60% of developers as active 30-day Copilot users, with data showing approximately 10% lift in PR velocity.

## Story 2: AutoCover - AI-Generated Unit Tests

The second initiative applies agentic design patterns to automated test generation, targeting the massive technical debt in test coverage across their monorepos.

### Agentic Design Philosophy

Uber uses LangChain and LangGraph with an internal abstraction layer for infrastructure deployment. Their approach treats developer workflows as state machines where some steps are deterministic (invoking builds, creating files) and others require LLM reasoning.

For test generation, they identified approximately 29 manual steps a developer would normally execute. The agentic pipeline simplifies this to:

- **Prepare phase** (deterministic): Set up mocks, create test files
- **Generate phase** (LLM): Create test code
- **Build/Run phase** (deterministic): Execute tests, capture failures
- **Fix phase** (LLM): If failures occur, invoke LLM to address build or test errors
- **Loop**: Continue until reaching desired coverage target (e.g., 80%)

### Integration and UX

AutoCover is integrated into VS Code using GitHub Copilot's Chat Participants API. Developers can invoke it with an "@AutoCover" mention and slash commands, streaming tests directly into their workflow while maintaining the ability to iterate.

### Handling Quality Concerns

When senior developers questioned test quality, the team added a validation step to the agentic pipeline. This step:
- Checks function comments against asserts to ensure alignment
- Identifies redundant tests that can be refactored
- Implements "table test patterns" (an Uber best practice) to collapse similar tests

The team treats test quality as an ongoing research area, with active iteration based on developer feedback.

### Future Directions

Several interesting extensions are planned:
- **Extracting validation tools**: Making test validation and table test refactoring available outside the generation flow (since "humans can also write bad tests")
- **Mutation testing**: Using LLMs to inject bugs into source code, then verifying tests catch them. Traditional mutation testing uses rule-based AST transformations to inject bugs, but LLMs can generate more varied and realistic bugs, enabling a feedback loop to strengthen test assertions
- **Headless mode for adoption**: Running AutoCover without IDE integration to generate tests proactively, using good results as a hook to drive tool adoption
- **Retroactive improvement**: Applying validation passes to existing tests across the codebase

## Story 3: AI-Assisted Java-to-Kotlin Migration

The third story demonstrates a sophisticated approach to large-scale code migration that combines deterministic AST-based transformations with LLM-assisted rule generation.

### Migration Context

Uber's Android monorepo contains over 10 million lines of code across Java and Kotlin, with nearly 100,000 files. Kotlin adoption began in 2017 when Google standardized it for Android, but scaling challenges (build times, annotation processing) required years of optimization before full product support in 2021. By 2022, organic adoption accelerated, and in 2025 they banned all new Java with linters.

### Current Tooling Architecture

The existing assisted migration pipeline is developer-driven:
- Pre-processors add nullability annotations (using Nullaway, their open-source Java compiler plugin)
- IntelliJ's Java-to-Kotlin converter performs core transformation
- Post-processors handle idiomatic conversions (AutoDispose function extensions, Mockito Kotlin migration, etc.)
- History-preserving commits maintain Git blame across file moves

At current adoption rates, reaching zero Java would take approximately 8 years—too long for Uber's goals.

### CI-Based Automation

The first automation step runs IntelliJ/Android Studio headlessly in CI, fully indexing the monorepo with all context and build caches. This enables automated conversion, testing, and code review generation. However, this approach still requires extensive manual rule writing for post-processors and is estimated at 3 years to completion.

### Why Not Just Use ChatGPT?

The team explicitly considered a pure LLM approach but rejected it due to:
- **Hallucination risk**: Any hallucinated code could cause production outages
- **Mobile deployment constraints**: Conservative rollout processes and slow user adoption of new versions make bugs particularly costly
- **Human review fallibility**: Even skilled engineers will miss LLM errors during code review

### Hybrid Approach: LLM-Assisted Rule Generation

The innovative solution combines both paradigms: use LLMs to accelerate the creation of deterministic AST rules, rather than having LLMs generate migration code directly.

**Training Data Collection**: They built a system using their DevPods (remote development environments) to:
- Parallelize work across many environments
- Check out historical Git states where developers completed migrations
- Run current Uber Java-to-Kotlin tooling against that historical Java
- Compare tooling output to what developers actually landed
- Aggregate deltas into a dataset of "what the tooling missed"

**Agentic Rule Generation Pipeline**:
- LLM receives the dataset, prompts, Rectify (their Java-to-Kotlin tooling) source code, and Java inputs
- LLM drafts an AST rule
- Rule runs through the Java-to-Kotlin pipeline
- Output goes through CI (tests, builds, lint)
- Failures feed back to the LLM for iteration
- Green outputs go to platform engineers for review
- Approved rules become permanent deterministic transformations

This approach is projected to cut the migration timeline to approximately 4 years—a 50% improvement. This estimate aligns with a recent Google study on LLM-assisted developer migrations showing similar speedups.

### Open Challenges

Several challenges remain:
- **Rollout risk management**: Starting with low-risk areas to build confidence before core flows
- **Rule categorization**: Ensuring reusability across many diffs
- **Developer trust**: Minimizing noise and errors in code review to maintain credibility
- **Hot path LLM usage**: Whether LLMs can be used directly for specific patterns like comment cleanup
- **Batch sizing**: Determining optimal diff sizes (one file, package, module?)
- **Rapid industry evolution**: LLMs improving generation over generation may enable more aggressive approaches over the 18-month timeline

## Measuring AI Impact

The team shared their evolving approach to measurement. While they have data showing 10% PR velocity lift for Copilot users, they identified challenges with pure quantitative metrics:
- **Fragmentation**: Each AI tool requires custom metrics that may not compose
- **Metric side effects**: Lines of code metrics produce verbose code; test coverage metrics produce flaky tests
- **Investment misdirection**: Hard-to-measure but valuable areas may be underinvested

Their current approach leads with qualitative signals (developer surveys showing "significantly more productive" responses) and normalizes quantitative data around "developer time saved"—a metric applicable across unit test generation, outage mitigation, code migrations, and other initiatives.

## Organizational Lessons

The case study highlights several organizational insights for LLMOps:
- Building internal AI capability requires deliberate skill development through hackathons and progressive projects
- Separating "AI application" expertise from "ML fundamentals" expertise enables faster adoption
- The ecosystem principle (building on platforms rather than replacing them) can be more sustainable than building from scratch
- Extracting reusable components from failed projects preserves value
- Developer education dramatically impacts adoption and effectiveness
- Qualitative measurement may be more practical than extensive quantitative frameworks in rapidly evolving domains