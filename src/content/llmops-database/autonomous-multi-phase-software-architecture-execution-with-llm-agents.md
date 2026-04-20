---
title: "Autonomous Multi-Phase Software Architecture Execution with LLM Agents"
slug: "autonomous-multi-phase-software-architecture-execution-with-llm-agents"
draft: false
llmopsTags:
  - "healthcare"
  - "code-generation"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "kubernetes"
  - "docker"
  - "cicd"
  - "fastapi"
  - "monitoring"
  - "security"
  - "compliance"
  - "guardrails"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "devops"
  - "documentation"
  - "open-source"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "healthcare"
company: "Cara"
summary: "Cara, a healthcare software platform company, used Claude Code (Opus 4.6) to autonomously execute 66 software tickets across 2 repositories, write 536 tests, and deliver a composable 5-layer architecture for their healthcare app platform in under 4 hours. The problem was a flat list of 25 scaffolds with no composition model, making it impossible to automatically assemble applications from component parts. The solution involved implementing a structured execution framework called RePPITS (Research, Propose, Plan, Implement, Test, Secure) with persistent memory, parallel subagents, phase gates, and comprehensive security audits. This required approximately 20-25 hours of preparation including codebase structuring, instruction file refinement, and epic planning. The autonomous execution produced approximately 20,000 lines of code organized into 53 scaffolds across 5 architectural layers (Foundation, Runtime, Capability, Adapter, Specialty), with 2 critical bugs and 10 other issues caught and fixed through automated security audits, resulting in zero deferred issues and only one minor production incident that was resolved in under 5 minutes."
link: "https://widal.substack.com/p/we-shipped-a-66-ticket-architecture"
year: 2026
seo:
  title: "Cara: Autonomous Multi-Phase Software Architecture Execution with LLM Agents - ZenML LLMOps Database"
  description: "Cara, a healthcare software platform company, used Claude Code (Opus 4.6) to autonomously execute 66 software tickets across 2 repositories, write 536 tests, and deliver a composable 5-layer architecture for their healthcare app platform in under 4 hours. The problem was a flat list of 25 scaffolds with no composition model, making it impossible to automatically assemble applications from component parts. The solution involved implementing a structured execution framework called RePPITS (Research, Propose, Plan, Implement, Test, Secure) with persistent memory, parallel subagents, phase gates, and comprehensive security audits. This required approximately 20-25 hours of preparation including codebase structuring, instruction file refinement, and epic planning. The autonomous execution produced approximately 20,000 lines of code organized into 53 scaffolds across 5 architectural layers (Foundation, Runtime, Capability, Adapter, Specialty), with 2 critical bugs and 10 other issues caught and fixed through automated security audits, resulting in zero deferred issues and only one minor production incident that was resolved in under 5 minutes."
  canonical: "https://www.zenml.io/llmops-database/autonomous-multi-phase-software-architecture-execution-with-llm-agents"
  ogTitle: "Cara: Autonomous Multi-Phase Software Architecture Execution with LLM Agents - ZenML LLMOps Database"
  ogDescription: "Cara, a healthcare software platform company, used Claude Code (Opus 4.6) to autonomously execute 66 software tickets across 2 repositories, write 536 tests, and deliver a composable 5-layer architecture for their healthcare app platform in under 4 hours. The problem was a flat list of 25 scaffolds with no composition model, making it impossible to automatically assemble applications from component parts. The solution involved implementing a structured execution framework called RePPITS (Research, Propose, Plan, Implement, Test, Secure) with persistent memory, parallel subagents, phase gates, and comprehensive security audits. This required approximately 20-25 hours of preparation including codebase structuring, instruction file refinement, and epic planning. The autonomous execution produced approximately 20,000 lines of code organized into 53 scaffolds across 5 architectural layers (Foundation, Runtime, Capability, Adapter, Specialty), with 2 critical bugs and 10 other issues caught and fixed through automated security audits, resulting in zero deferred issues and only one minor production incident that was resolved in under 5 minutes."
notion:
  pageId: "345f8dff-2538-8098-a1a7-e7086b5e60da"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-17T08:01:00.000Z"
  lastEditedTime: "2026-04-17T08:01:00.000Z"
  publishedAt: "2026-04-20T06:52:00Z"
---

## Overview

Cara is a San Francisco-based healthcare technology company building an integrated healthcare software ecosystem that combines managed infrastructure (EHR connectivity, telehealth, communications, document AI) with AI-powered application generation. The company allows doctors to describe healthcare applications in plain English and receive production-ready software with EHR integration, labs connectivity, and HIPAA compliance. This case study, published in April 2026, details how the technical co-founder Nils Widal leveraged Claude Code (Opus 4.6) to autonomously execute a major software architecture migration involving 66 tickets, creating a composable 5-layer architecture from a previously flat 25-scaffold system.

The case is particularly notable for its transparency about both the impressive autonomous execution (under 4 hours) and the significant preparation required (approximately 20-25 hours). The author emphasizes that this is "not a story about AI being magic" but rather about the "execution harness" - the systematic infrastructure surrounding the LLM that transforms raw capability into reliable production output. The technical co-founder's 15+ years in technology and 7 years in healthtech were crucial for architectural design and planning, while the LLM handled execution.

At the time of this milestone, the Cara platform had already achieved 221 production releases, 702 commits, and 683 dev deployments over 24 days of active development, built on top of a substantial infrastructure foundation of approximately 150,000 lines developed over the prior year. This context is important for understanding that this wasn't a greenfield experiment but rather a sophisticated evolution of an already-mature production system.

## The Technical Problem and Solution Architecture

The core problem Cara faced was architectural: they had 25 scaffolds (pre-built TypeScript modules with typed interfaces, sample data, and clinical UI components) organized as a flat list without a composition model. This meant that creating a specialized application like "behavioral health app with voice AI on Athena" required manual assembly of components rather than automatic composition. Additionally, the AI agent safety architecture was missing critical safeguards - LLMs were making clinical routing decisions that should have been deterministic and rule-based.

The solution was a comprehensive 5-layer architecture comprising 53 scaffolds and 113 injectable files:

- **Foundation Layer** (8 scaffolds): Safety primitives, core types, and audit trail functionality
- **Runtime Layer** (9 scaffolds): Interaction mechanisms including streaming chat, voice, video, and webhooks
- **Capability Layer** (21 scaffolds): Functional capabilities like billing, prescribing, and 21 clinical features
- **Adapter Layer** (9 scaffolds): External system integrations for Canvas, Athena, Elation, Healthie, and Epic EHR systems
- **Specialty Layer** (6 scaffolds): Domain-specific packages with clinical policy bundles

The architecture also includes a dependency resolver that walks the manifest graph, a policy-driven planner that maps high-level requirements to the appropriate composition of scaffolds, and critically, a deterministic clinical safety engine where the LLM proposes actions but deterministic code makes final decisions. This safety architecture is based on a published whitepaper on failsafe medical triage agents, addressing the fundamental concern that clinical decision-making cannot rely solely on probabilistic LLM outputs.

## The RePPITS Execution Framework

The cornerstone of the LLMOps approach is the RePPITS framework - an extension of Mihail Eric's RePPIT methodology with an added Security phase specifically for healthcare compliance. RePPITS stands for Research, Propose, Plan, Implement, Test, and Secure. Every ticket must follow this workflow without exception, and the agent cannot skip phases or commit code without passing all gates.

The Research phase is notably comprehensive, extending far beyond simple codebase analysis. The agent fetches whitepapers from S3, analyzes cross-repository AWS architecture, and reads EHR API documentation. This transforms the agent from a simple code generator into something approximating a junior engineer who consults documentation before writing code. The Propose phase requires the agent to present two alternative approaches, ensuring consideration of multiple solutions. The Plan phase defines concrete tasks before any implementation begins. The Test phase runs the full test suite (536 tests were written during this execution). Finally, the Secure phase runs healthcare compliance checks for HIPAA, SOC2, and HITRUST before any code is committed.

RePPITS has been open-sourced as a VS Code/Cursor plugin under the name "RePPIT Health" by Cara, available under Apache 2.0 license. The methodology represents a significant contribution to the broader LLMOps community, particularly for regulated industries where compliance gates are mandatory rather than optional.

## Persistent Memory System

One of the most innovative aspects of Cara's LLMOps approach is the file-based persistent memory system that maintains context across agent sessions. Every correction the agent receives becomes a durable rule stored on disk. The case study provides a concrete example of a memory rule:

```
name: No tech jargon in user-facing surfaces
type: feedback

Never expose infrastructure names in UI.
"Cara Telehealth" not "LiveKit". "Preview" not "Sandpack".

Why: Users are non-technical healthcare staff. They don't know or care what powers the features.

How to apply: Any UI string, credential card, or marketing copy uses Cara branding. Technical names stay in code comments and system prompts only.
```

The agent reads every memory rule at the start of each session, meaning that session N+1 inherits all lessons from sessions 1 through N. This addresses a fundamental challenge in LLMOps: how to prevent agents from repeating mistakes across different sessions. The author notes that "the agent does not repeat mistakes because it literally remembers being corrected," which represents a pragmatic solution to maintaining context and learning over extended development timelines. This is particularly valuable for production systems where consistency and adherence to established patterns is crucial.

## Instruction Files and Configuration Management

Cara maintains two separate markdown files checked into version control at the repository root, with a clear separation of concerns between process and context:

**CLAUDE.md** defines process rules including the implementation sequence: implement → test → lint → review → secure → commit → push → verify CI → update tracker. These process rules rarely change between milestones, providing stability in the execution workflow.

**AGENTS.md** provides technical context including the tech stack, project map, scaffold manifests, build commands, and code style guidelines. This file evolves with every feature addition and architectural change.

The separation is architecturally significant for LLMOps because it reduces risk: when adding a new scaffold, only AGENTS.md needs updating, eliminating the possibility of accidentally modifying workflow enforcement rules during documentation updates. This mirrors software engineering best practices of separating configuration from code and represents thoughtful systems design for AI agent execution.

## Comprehensive Planning and Multi-Model Analysis

The autonomous execution was preceded by thorough upfront planning - approximately 3 hours of epic planning that the author emphasizes was "only possible because of 7 years in healthtech (and decades of software engineering)." The architecture was completely defined before any code was written, including 66 Linear issues with blocking dependencies, interface definitions, and acceptance criteria. Every ticket understood its position in the dependency graph, eliminating the need for mid-execution redesigns.

The planning process incorporated a multi-model analysis approach where Claude Opus 4.6, GPT-5.4, and Gemini 3.1 Ultra were used as gap analysis agents over 5-6 hours to refine instruction files. The author notes that "each model found blind spots the others missed," suggesting that different LLM architectures and training approaches can provide complementary perspectives on potential issues. This multi-model validation represents a sophisticated approach to quality assurance in LLMOps, though it also indicates significant computational cost and complexity.

The planning also included research documents in Linear - scaffold audits, maturity deep-dives, and vendor strategy analyses linked to the epic. The agent accessed these during execution via Model Context Protocol (MCP) tools, demonstrating integration between planning systems (Linear) and execution systems (the coding agent).

## Parallel Subagent Orchestration

For independent tickets, the main agent spawned 2-5 parallel subagents with precise prompts, with 19 parallel subagent batches used across the full execution. This parallelization is crucial for achieving the under-4-hour execution time for 66 tickets. However, the case study reveals a critical safeguard: after parallel work completes, the combined diff must be reviewed holistically.

This rule exists because of a real incident in a previous milestone where an SSRF (Server-Side Request Forgery) vulnerability was introduced by one parallel agent. The vulnerability was invisible to that individual agent's review but was caught when the combined diff was reviewed as a whole. This represents an important lesson for LLMOps at scale: parallel execution provides speed benefits but introduces integration risks that require systematic mitigation through mandatory combined review gates.

The parallel subagent pattern mirrors the author's prior experience running a 100+ person development organization, where delegation and systematic verification replace direct oversight of every detail. The case study explicitly draws this connection, noting that "the skills required to direct autonomous AI agents closely mirror those required to lead large engineering organizations."

## Phase Gates and Production Safeguards

The 66 tickets were organized into 7 phases with mandatory gates after each phase: full test suite execution, type-checking, git push, CI verification, and Kubernetes pod health checks. If any gate fails, execution stops, the issue is fixed, and all gates are re-verified before proceeding.

The phase gate system caught at least one production-breaking bug: a schema change that added a database column without the corresponding ALTER TABLE migration. This caused the development site to crash, but the Kubernetes pod health check caught the failure and the issue was fixed in under 5 minutes with the proper ALTER TABLE statement. This demonstrates the value of comprehensive automated verification in production LLMOps workflows.

Beyond phase gates, two comprehensive security audits were conducted - one after Phase 4 (covering 11,625 lines of code) and another after Phase 7 (covering 7,708 lines). These audits found 2 safety-critical bugs and 10 total issues, all of which were fixed immediately with zero items deferred. This zero-deferred-issues approach is notable and suggests a high standard for production quality in the healthcare domain where compliance and safety are paramount.

One particularly illuminating bug caught by security audits was in the policy engine boundary logic: maxRisk === 1.0 (the highest danger score) defaulted to SELF_CARE_INFO_ONLY (the lowest urgency level). This represents an inverted safety mapping that could have serious clinical consequences. The bug passed all 536 automated tests, highlighting a fundamental limitation of test-driven approaches: tests validate that code does what you specified, but may not catch fundamental logic errors in the specifications themselves. The structured security review caught the issue by reading and reasoning about the mathematical logic rather than just executing test cases.

## Preparation Investment and Greenfield Advantages

The case study is commendably transparent about the preparation required to enable autonomous execution. Approximately 3 weeks of codebase structuring at 4-6 hours per week involved establishing consistent naming conventions, typed package boundaries, strict TypeScript configuration, CI/CD pipeline setup, and Kubernetes manifests. The author explicitly notes this was "feasible because Cara was greenfield" and that "in a brownfield codebase, this would take significantly longer."

This is a critical observation for evaluating the generalizability of the approach. Greenfield projects can establish conventions and structure from the beginning, whereas brownfield projects must refactor existing code, deal with legacy patterns, manage migration risks, and work around technical debt. The LLMOps community should be cautious about assuming that results achieved on well-structured greenfield codebases will transfer directly to typical enterprise brownfield environments without significant additional investment.

The total preparation breakdown was approximately:
- 3 weeks of codebase structuring (12-18 hours total)
- 5-6 hours of instruction file refinement using multiple LLMs
- 3 hours of epic planning
- Total: approximately 20-25 hours

This preparation-to-execution ratio (roughly 5:1 to 6:1) is important for cost-benefit analysis. While 4 hours of autonomous execution is impressive, it required 20-25 hours of expert preparation. For organizations evaluating LLMOps approaches, the full cost including preparation time should be considered.

## Technology Stack and Infrastructure

The implementation uses Claude Code with Opus 4.6 as the primary coding agent. The codebase is TypeScript with strict typing enforced. Deployment infrastructure includes Kubernetes for container orchestration, a CI/CD pipeline with automated verification, and AWS infrastructure (referenced through S3 storage for whitepapers and internal documentation).

The Cara platform itself injects pre-built TypeScript modules (scaffolds) into an AI workspace, where the AI composes these into applications. Critically, scaffolds call Cara Platform's managed services rather than allowing generated apps to directly interact with AWS SDKs or third-party APIs. This represents a secure-by-default architecture where the LLM operates within guardrails defined by the scaffold system.

The case study references Linear for issue tracking and project management, with the agent accessing Linear documents via MCP (Model Context Protocol) tools. The integration between planning systems and execution agents through MCP represents an emerging pattern in LLMOps for providing agents with structured access to external context and documentation.

## Results and Production Impact

The quantitative results are substantial:
- 66 tickets executed autonomously
- 536 tests written
- Approximately 20,000 lines of code added
- 53 scaffold manifests created
- 113 injectable files produced
- Under 4 hours execution time (20:37 to 00:26 PDT on April 1st, 2026)
- 2 safety-critical bugs found and fixed
- 10 total issues found and fixed
- 0 items deferred
- 0 CI failures
- 1 production incident (fixed in under 5 minutes)

The architecture delivered enables the core business value: users can now specify "behavioral health app with voice AI on Athena" and have the correct scaffolds automatically composed, whereas previously every combination required manual assembly. The deterministic clinical safety engine ensures that clinical routing decisions follow established medical protocols rather than relying on LLM outputs, addressing fundamental safety concerns in healthcare AI.

## Lessons and Critical Observations

The author identifies several key lessons that merit emphasis from an LLMOps perspective:

**Accumulated context beats raw intelligence**: The persistent memory system makes each subsequent session better at the specific project rather than better at coding in general. This challenges the assumption that newer, more capable base models automatically produce better results - project-specific context accumulated over time may be more valuable than incremental improvements in base model capabilities.

**Process enforcement beats hope**: The mandatory RePPITS gates caught real bugs that both automated tests and human review missed. This emphasizes the importance of systematic workflows over ad-hoc approaches in production LLMOps.

**Planning before execution beats reactive coding**: The comprehensive upfront planning with external analyses, published research, and detailed dependency mapping eliminated mid-execution redesigns. This runs counter to common agile development practices that emphasize responding to change, suggesting that for autonomous agent execution, waterfall-style upfront planning may be more effective.

**Domain expertise remains essential**: The LLM executed the plan but did not design it. The architectural decisions required 7 years of healthcare technology experience and decades of software engineering expertise. This is perhaps the most important observation for evaluating the case study's claims - the impressive autonomous execution was enabled by extensive human expertise in the planning phase.

## Critical Assessment and Limitations

While the results are impressive, several factors should be considered when evaluating the generalizability and sustainability of this approach:

**Greenfield advantage**: The author explicitly acknowledges that codebase structuring was feasible because Cara was greenfield. Most enterprises operate brownfield codebases where establishing the necessary structure would require substantially more investment.

**Single expert model**: The success depended on domain expertise and execution authority residing in one person. The author notes that the model "scales (with additional overhead) to SME teams" but the additional overhead is not quantified. Coordination costs between clinical, compliance, and technical experts each directing agents could be substantial.

**Preparation-to-execution ratio**: While 4 hours of autonomous execution is impressive, it required 20-25 hours of expert preparation. For many use cases, this ratio may not represent a net productivity gain over traditional development, particularly when the expertise required for planning is scarce.

**Healthcare-specific constraints**: The mandatory security audits, compliance checks, and deterministic safety engine are necessary for healthcare but add significant complexity. Organizations in less regulated domains might achieve simpler implementations but also face different risk profiles.

**Test coverage limitations**: The policy engine bug (maxRisk mapping to lowest urgency) passed all 536 tests, highlighting that comprehensive test suites do not guarantee correctness of underlying logic. Over-reliance on test-driven validation for agent-generated code could create a false sense of security.

**Limited validation timeline**: The case study describes a single execution on April 1st, 2026. Longer-term data on maintenance costs, bug rates in production, and whether the architecture actually delivers on its composability promises would strengthen the evidence base.

## Future Direction: Ultra Mode

The case study concludes by describing plans for "Ultra Mode" - offering the same RePPITS methodology directly to Cara users for generating enterprise-grade production applications. The vision includes deep discovery through 10-20 targeted questions, architecture planning presented for review before coding, phased builds with gates, parallel agents building independent features, and security audits before deployment.

This represents an ambitious extension of the LLMOps approach from internal development tooling to external product capability. The success of this extension will depend on whether the methodology can work for users who lack the domain expertise that was crucial to the initial success. The case study suggests Cara plans to encode expertise within the discovery questions and planning templates, but whether this can substitute for deep healthcare knowledge remains to be validated.

## Contribution to LLMOps Practice

Despite the limitations noted above, this case study makes several valuable contributions to LLMOps practice:

**Structured workflow methodology**: RePPITS provides a concrete, reproducible framework for autonomous agent execution with clear phase gates and compliance integration. The open-sourcing of this as a VS Code/Cursor plugin makes it available for broader adoption.

**Persistent memory pattern**: The file-based memory system with human-readable rules provides a practical approach to maintaining context and learning across sessions without depending on fine-tuning or embedding-based retrieval.

**Multi-model validation**: Using different LLMs for gap analysis represents a pragmatic approach to quality assurance that exploits the different strengths and blind spots of various models.

**Parallel execution with integration review**: The pattern of parallel subagents with mandatory combined diff review provides a concrete mitigation for integration risks in parallelized agent workflows.

**Transparency about preparation**: The honest accounting of preparation time and expertise required sets realistic expectations and provides a more complete picture than case studies that focus only on execution metrics.

Overall, this case study represents a sophisticated, production-grade application of LLMs for autonomous software development in a highly regulated domain. The results are impressive but context-dependent, and the methodology's applicability to different organizational contexts will depend significantly on the ability to invest in similar levels of preparation, establish comparable structural foundations, and access equivalent domain expertise.
