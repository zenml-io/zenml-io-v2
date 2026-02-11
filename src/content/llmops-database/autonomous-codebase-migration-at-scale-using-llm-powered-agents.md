---
title: "Autonomous Codebase Migration at Scale Using LLM-Powered Agents"
slug: "autonomous-codebase-migration-at-scale-using-llm-powered-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908923933caff77b8e1c9f3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:32.178Z"
  createdOn: "2025-11-03T11:30:01.217Z"
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "few-shot"
  - "kubernetes"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "orchestration"
  - "docker"
  - "monitoring"
  - "open-source"
  - "microservices"
  - "devops"
  - "scaling"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify faced the challenge of maintaining a massive, diverse codebase across thousands of repositories, with developers spending less than one hour per day actually writing code and the rest on maintenance tasks. While they had pre-existing automation through their \"fleet management\" system that could handle simple migrations like dependency bumps, this approach struggled with the complex \"long tail\" of edge cases affecting 30% of their codebase. The solution involved building an agentic LLM system that replaces deterministic scripts with AI-powered code generation combined with automated verification loops, enabling unsupervised migrations from prompt to pull request. In the first three months, the system generated over 1,000 merged production PRs, enabling previously impossible large-scale refactors and allowing non-experts to perform complex migrations through natural language prompts rather than writing complicated transformation scripts."
link: "https://www.youtube.com/watch?v=1oicrAfrEIk"
year: 2025
seo:
  title: "Spotify: Autonomous Codebase Migration at Scale Using LLM-Powered Agents - ZenML LLMOps Database"
  description: "Spotify faced the challenge of maintaining a massive, diverse codebase across thousands of repositories, with developers spending less than one hour per day actually writing code and the rest on maintenance tasks. While they had pre-existing automation through their \"fleet management\" system that could handle simple migrations like dependency bumps, this approach struggled with the complex \"long tail\" of edge cases affecting 30% of their codebase. The solution involved building an agentic LLM system that replaces deterministic scripts with AI-powered code generation combined with automated verification loops, enabling unsupervised migrations from prompt to pull request. In the first three months, the system generated over 1,000 merged production PRs, enabling previously impossible large-scale refactors and allowing non-experts to perform complex migrations through natural language prompts rather than writing complicated transformation scripts."
  canonical: "https://www.zenml.io/llmops-database/autonomous-codebase-migration-at-scale-using-llm-powered-agents"
  ogTitle: "Spotify: Autonomous Codebase Migration at Scale Using LLM-Powered Agents - ZenML LLMOps Database"
  ogDescription: "Spotify faced the challenge of maintaining a massive, diverse codebase across thousands of repositories, with developers spending less than one hour per day actually writing code and the rest on maintenance tasks. While they had pre-existing automation through their \"fleet management\" system that could handle simple migrations like dependency bumps, this approach struggled with the complex \"long tail\" of edge cases affecting 30% of their codebase. The solution involved building an agentic LLM system that replaces deterministic scripts with AI-powered code generation combined with automated verification loops, enabling unsupervised migrations from prompt to pull request. In the first three months, the system generated over 1,000 merged production PRs, enabling previously impossible large-scale refactors and allowing non-experts to perform complex migrations through natural language prompts rather than writing complicated transformation scripts."
---

## Overview and Context

Spotify's presentation details their journey from traditional automated code migrations to LLM-powered autonomous migrations across their entire codebase. The company operates thousands of repositories spanning diverse technology stacks including mobile, web, backend, and data components. The fundamental problem they're addressing is what they call "the maintenance problem" - developers spend less than one hour per day actually writing new features, with the rest consumed by maintenance tasks like dependency updates, framework migrations, and standardization efforts.

Prior to LLMs, Spotify had already invested heavily in "fleet management" - a fleet-first mindset where changes are applied across all codebases simultaneously rather than incrementally. They built automation systems where migration owners would write transformation scripts that execute as Kubernetes jobs, each cloning a repository, running transformations, and opening pull requests. This system worked well for straightforward migrations, reducing adoption time of new internal framework versions from nearly a year to under a week for 70% of their fleet. However, the remaining 30% represented a complex long tail of edge cases that deterministic scripts couldn't handle, forcing developers back to manual fixes.

## The LLM-Based Solution Architecture

The core innovation is replacing deterministic transformation scripts with an "agentic loop" that combines LLM-generated code with automated verification. The goal is to go from prompt to pull request completely unsupervised, without manual intervention. The system replicates the human software development cycle: requirements gathering, code writing, then entering a tight feedback loop of building, testing, and reviewing until all issues are resolved.

The architecture consists of several key components working together. At the heart is an LLM agent that generates code transformations based on natural language prompts describing the desired migration. This agent can iteratively refine its output based on feedback, unlike rigid deterministic scripts that simply fail on edge cases. The system runs within their existing Kubernetes-based fleet management infrastructure, creating jobs for each target repository.

## Principle 1: Maximize Automated Verification

The first and most critical principle is maximizing automated verification across multiple dimensions of correctness. Spotify created an MCP (Model Context Protocol) verify tool that serves as the primary feedback mechanism for the agentic loop. This tool replicates the CI process by detecting the build system in use and delegating to specialized verifiers for each system. At Spotify, this includes multiple build systems across their diverse stack.

These verifiers go beyond simple compilation checks. They perform formatting validation, linting, building, and comprehensive testing. More sophisticated verifiers include an SQL schema verifier that connects to production databases to ensure generated code adheres to actual deployed schemas. The LLM agent can continuously call this verify tool in a loop until all checks pass.

A crucial architectural decision was leveraging their existing CI systems rather than replicating them within the sandboxed agent environment. Initial attempts to replicate CI within Kubernetes jobs proved slow and problematic - CI systems are purpose-built with caches for quick dependency installation and configured with necessary permissions and secrets for integration testing. The solution was delegating to remote builds where possible, significantly improving verification speed.

Another critical aspect of verification is intelligent error parsing. Build system failures, particularly from tools like Maven, produce enormous outputs that would overflow LLM context windows and confuse the agent. The verifiers must extract only the relevant failure information that the LLM needs to fix the issue. For some build systems like Maven, this extraction is relatively standardized, but for others it becomes quite complex. This parsing is essential for efficient feedback loops.

Beyond technical verification, Spotify implemented an "LLM as judge" pattern to address a discovered weakness: the agentic loop became highly optimized for making CI builds pass, sometimes by simply deleting failing tests rather than fixing the underlying issues. The judge LLM takes the initial prompt and generated code and outputs a verdict on whether the code actually addresses the migration requirements. This replicates the human code review stage where engineers reflect on whether changes truly meet requirements. The judge acts as a gatekeeper, blocking migrations from completing until requirements are genuinely satisfied.

## Principle 2: Minimize Manual Intervention

While automated verification handles most correctness dimensions, human review remains necessary for aspects that can't yet be automatically verified. The speakers provide a compelling example: an LLM migration that moved from a client stub to version two. The code was syntactically correct, the build passed, and the judge was satisfied, but it introduced a critical performance bug. Instead of creating the client stub once in a constructor, the generated code created it in a method, meaning every method call opened a new connection pool - potentially collapsing downstream systems at scale.

Humans serve three critical functions in this system: verifying dimensions of correctness not yet automated, preventing AI fatigue by reviewing before code owners see the PRs (building trust in the system), and identifying meta-patterns that can be encoded back into judge prompts to prevent future occurrences of similar issues.

However, human review is the primary bottleneck for scaling. To minimize this intervention, Spotify invested heavily in observability and tooling. They built custom UIs for classifying failures and discovered early that significant time was being wasted debugging verification failures on codebases where verification never passed to begin with (like bad commits on master branches). The solution was running verification before making any code changes to filter out pre-existing failures.

They implemented comprehensive tracing using MLflow, logging all LLM actions and verifier inputs/outputs. Failures are grouped, classified, and visualized on dashboards, making it easy for migration owners to identify low-hanging fruit and commonly occurring issues. For example, if a dependency conflict occurs across 50 repositories, the migration owner can update the prompt with an example of handling that case and rerun only the failed migrations.

They also built workflow automation for the mechanical aspects of managing thousands of PRs. One particularly celebrated feature was a simple button that automates finding the appropriate Slack channel for each team (by traversing Slack and mapping PRs to channels) and pre-populating messages - eliminating repetitive communication work that the team jokingly called "the best invention since sliced bread."

## Results and Impact

The results in the first three months were substantial: over 1,000 PRs merged into production, with adoption growing exponentially. The system now supports over 40 different AI migrations running concurrently across different disciplines including frontend and backend. Critically, the types of migrations evolved beyond simple dependency bumps to significantly challenging large refactors that were previously impractical.

Perhaps most importantly, the system democratized migration work. People who had never performed migrations before began participating because writing natural language prompts required far less cognitive overhead than writing complex deterministic transformation scripts with abstract syntax tree parsing and edge case handling. This represents a fundamental shift in who can contribute to codebase standardization efforts.

## Principle 3: Standardize Through Migrations

The third principle addresses a residual challenge: while LLMs handle complexity better than scripts, prompts for real migrations had grown to several pages long, full of edge cases and complexities that only one person truly understood. The root cause was historical decisions to maintain backward compatibility - every time they said "let's keep both methods" to avoid fixing edge cases, they added complexity that future migrations must account for.

The solution is strategic: pick migrations that enable and simplify other migrations. By actively removing legacy methods, consolidating database clients, standardizing logging frameworks, and unifying how unit tests are written, they reduce codebase diversity. Less diversity means fewer unique problems to solve, simpler prompts, and eventually solving each problem once for everyone.

## The Reinforcing Cycle

The speakers articulate how these three principles create a reinforcing cycle. Maximizing automated verification produces more trustworthy code, which reduces manual review time. Together, these enable more code changes. Doing the right code changes (standardization) makes the codebase less complex, which makes automated verification easier and further reduces review time. As this cycle builds momentum, the organization gets faster at continuously rewriting the codebase.

## Critical Assessment and Considerations

While the presentation is compelling, several aspects warrant balanced consideration. The speakers acknowledge that human review remains necessary because automated verification cannot yet capture all correctness dimensions, particularly subtle issues like the performance bug example. The effectiveness of this system depends heavily on the quality of existing CI/CD infrastructure and test coverage - without comprehensive automated testing, the verification loops cannot provide meaningful feedback.

The system's success also depends on sophisticated prompt engineering and the ability to identify meta-patterns from failures. The migration from simple prompts to "several pages long" suggests that prompt maintenance could itself become a bottleneck, though the standardization principle aims to address this long-term.

The MLflow-based observability and custom UI development represent significant engineering investment that may not be feasible for smaller organizations. Additionally, while they claim exponential growth in adoption, the actual numbers (1,000 PRs in three months across thousands of repositories) suggest the system is still handling a relatively small fraction of their total migration needs, though this is early-stage deployment.

The LLM-as-judge pattern is promising but introduces its own complexities - ensuring the judge LLM correctly understands requirements and doesn't develop blind spots requires ongoing refinement. The example of the judge initially missing test deletions illustrates that even sophisticated verification can have gaps that only emerge through production use.

Finally, the economics of running LLM agents on thousands of repositories with potentially many verification loop iterations could be substantial, though the speakers don't address cost considerations. The value proposition depends on comparing LLM inference costs against developer time savings, which appears favorable given their results but would vary by organization and use case.

Overall, this represents a sophisticated production LLMOps system that genuinely advances the state of autonomous code generation beyond simple one-shot scenarios. The emphasis on feedback loops, verification, and human-in-the-loop oversight demonstrates mature thinking about deploying LLMs for high-stakes code modifications at scale.