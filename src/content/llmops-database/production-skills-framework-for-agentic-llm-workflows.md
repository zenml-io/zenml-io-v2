---
title: "Production Skills Framework for Agentic LLM Workflows"
slug: "production-skills-framework-for-agentic-llm-workflows"
draft: false
llmopsTags:
  - "code-generation"
  - "customer-support"
  - "content-moderation"
  - "poc"
  - "document-processing"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "system-prompts"
  - "evals"
  - "few-shot"
  - "memory"
  - "chunking"
  - "langchain"
  - "fastapi"
  - "documentation"
  - "cicd"
  - "open-source"
  - "crewai"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "microsoft-azure"
industryTags: "tech"
company: "WorkOS"
summary: "WorkOS developed a comprehensive approach to productionizing LLM workflows through \"skills\" - reusable, composable units of work that encapsulate specific tasks, constraints, and domain knowledge in markdown files with optional scripts. The problem addressed was the repetitive nature of LLM interactions where context must be reloaded from scratch in every conversation, leading to inconsistent outputs and wasted time. Their skills framework enables teams to codify workflows once, share them across team members and projects, and achieve more consistent, deterministic results. The solution has been applied across multiple use cases including code installation automation, content generation, image/video creation, and internal tooling, with WorkOS shipping production tools like their CLI that leverage skills to automate developer onboarding and authentication setup."
link: "https://www.youtube.com/watch?v=pFsfax19yOM"
year: 2026
seo:
  title: "WorkOS: Production Skills Framework for Agentic LLM Workflows - ZenML LLMOps Database"
  description: "WorkOS developed a comprehensive approach to productionizing LLM workflows through \"skills\" - reusable, composable units of work that encapsulate specific tasks, constraints, and domain knowledge in markdown files with optional scripts. The problem addressed was the repetitive nature of LLM interactions where context must be reloaded from scratch in every conversation, leading to inconsistent outputs and wasted time. Their skills framework enables teams to codify workflows once, share them across team members and projects, and achieve more consistent, deterministic results. The solution has been applied across multiple use cases including code installation automation, content generation, image/video creation, and internal tooling, with WorkOS shipping production tools like their CLI that leverage skills to automate developer onboarding and authentication setup."
  canonical: "https://www.zenml.io/llmops-database/production-skills-framework-for-agentic-llm-workflows"
  ogTitle: "WorkOS: Production Skills Framework for Agentic LLM Workflows - ZenML LLMOps Database"
  ogDescription: "WorkOS developed a comprehensive approach to productionizing LLM workflows through \"skills\" - reusable, composable units of work that encapsulate specific tasks, constraints, and domain knowledge in markdown files with optional scripts. The problem addressed was the repetitive nature of LLM interactions where context must be reloaded from scratch in every conversation, leading to inconsistent outputs and wasted time. Their skills framework enables teams to codify workflows once, share them across team members and projects, and achieve more consistent, deterministic results. The solution has been applied across multiple use cases including code installation automation, content generation, image/video creation, and internal tooling, with WorkOS shipping production tools like their CLI that leverage skills to automate developer onboarding and authentication setup."
notion:
  pageId: "35df8dff-2538-8059-b1b1-e43ba94d141d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:33:00.000Z"
  lastEditedTime: "2026-05-11T20:33:00.000Z"
  publishedAt: "2026-05-11T20:41:04Z"
---

## Overview

This case study documents WorkOS's approach to operationalizing LLM-based workflows through a "skills" framework. The company's Applied AI team, represented by developer experience engineers Nick Nissi and Zach Proer, presented their methodology for creating reusable, shareable units of LLM context and instructions that can be deployed across different models, environments, and team members. The framework addresses fundamental LLMOps challenges around context management, consistency, team collaboration, and the integration of deterministic components into non-deterministic LLM conversations.

## The Core Problem

The fundamental challenge identified was that every LLM conversation starts from zero context. Users must repeatedly provide the same information about coding conventions, project structures, preferences, and domain knowledge with each new interaction. This creates several issues in production scenarios:

- **Context reinitiation overhead**: Developers waste significant time reloading context at the beginning of each session, explaining project-specific conventions, tooling choices, and workflows
- **Inconsistent outputs**: Without codified knowledge, the same task performed by the same model can produce different results based on how the prompt is phrased
- **Knowledge siloing**: Individual developers accumulate effective prompts and patterns but lack a mechanism to share them systematically with teammates
- **Repository lock-in**: While files like claude.md or agents.md provide some memory within a repository, they bloat context windows with information that may not always be relevant and aren't easily portable across projects
- **Lack of determinism**: Pure LLM interactions can't reliably execute specific commands or return structured data in exactly the format needed for downstream processes

The presenters noted they hadn't written code without AI assistance in six to eight months, making these productivity issues particularly acute for teams heavily invested in agentic development.

## The Skills Framework Solution

### Architecture and Design

Skills are discrete, portable units of work defined primarily through markdown files with YAML front matter. At their simplest, a skill consists of a single skill.md file containing:

- **Name and Description**: The description serves as a routing rule that LLMs use to determine when to invoke the skill. This is not documentation for humans but rather semantic metadata for AI decision-making
- **Context and Constraints**: Rather than being overly prescriptive about execution steps, effective skills provide constraints that guide the LLM's decision-making (e.g., "never be vague," "always cite specific git commits and line numbers," "use pnpm not npm")
- **Optional Scripts**: Skills can include shell scripts or other executables that inject deterministic results into the LLM conversation through interpolation syntax

The framework supports progressive disclosure, where skills can reference additional markdown files that are only loaded when specific conditions are met. This prevents context window bloat while maintaining access to detailed information when needed.

### Implementation Patterns

**Script Interpolation**: Skills can use bang-backtick syntax to execute scripts and inject their output directly into the LLM context. For example, instead of asking the LLM to "find the last 10 commits," a skill might execute a specific git command and provide the formatted results directly. This approach:
- Saves tokens by avoiding multiple attempts at command formulation
- Ensures consistency in how data is retrieved
- Provides deterministic starting points for non-deterministic analysis

**Confidence Scoring**: Skills can enforce iterative refinement by requiring the LLM to assess its confidence before proceeding. The ideation skill demonstrated in the workshop uses a 100-point rubric across dimensions like problem clarity, goal definition, success criteria, scope boundaries, and consistency. The LLM only proceeds when confidence exceeds a threshold (typically 90-95%), otherwise it asks clarifying questions. While the math is "fuzzy" as acknowledged, the value lies in forcing iterative clarification.

**Progressive Disclosure**: Skills can conditionally load additional context. For example, the WorkOS skill router only loads framework-specific documentation when working with that framework. A testing skill might only load detailed testing rubrics when actually performing test analysis. This pattern is expressed through simple conditional statements in the skill markdown.

**Routing and Descriptions**: The description field is critical for automatic skill selection. When multiple skills are available, LLMs use descriptions to route tasks to appropriate skills. Teams can have framework-specific image generation skills, with descriptions that trigger on context like "personal blog uses pixel art" versus "work projects use S3-hosted professional imagery."

### Distribution and Loading

Skills can be loaded from multiple locations:
- **Project-specific**: `.claude/skills/` directory in a repository for team-wide conventions
- **Global user skills**: `.claude/skills/` in the home directory for personal preferences
- **Plugin marketplaces**: Installation via package managers (e.g., `npx skills add`) from curated repositories
- **Direct sharing**: Renaming a zipped skill folder to `.skill` extension enables drag-and-drop installation in tools like Claude Desktop

This flexibility allows skills to be shared at appropriate scopes - individual, team, organization, or public - while maintaining version control through standard git workflows.

## Production Applications

### WorkOS CLI Installation Tool

The flagship production implementation is WorkOS's CLI tool, which automates authentication setup in web applications. The tool runs `npx workos install` to:
- Detect the application's framework (Next.js, TanStack Start, React Router, etc.)
- Remove existing authentication implementations
- Install WorkOS AuthKit with framework-appropriate configuration
- Create or link a WorkOS account

The entire intelligence layer runs on the Claude Agent SDK (programmatic Claude Code) with all domain knowledge encoded in skills stored in the public WorkOS skills repository. This architecture provides several benefits:
- **Two birds with one stone**: Skills are proven in production CLI usage while remaining available for manual developer use
- **Zero-friction onboarding**: Developers can run a single command without authentication setup, as the CLI proxies to WorkOS's API token
- **Maintainability**: Improving the skill improves both CLI and manual workflows simultaneously
- **Evaluation-driven**: Skills are tested against benchmarks to ensure they improve rather than degrade performance

### Content and Media Generation

Skills enable non-technical team members to perform complex tasks through simple prompts:

**Recruiting workflows**: The recruiting team uses skills that aggregate data from Slack, Notion, and recruiting software to generate candidate reports. Skills understand the specific format and criteria the team needs without requiring manual data collection.

**Video generation**: A remotion skill demonstrates the power of chaining API calls within a skill. For a simple text prompt like "child running through field," the skill:
- Calls an image generation API (e.g., Imagen 3) to create a static image
- Passes that image to a video API with instructions to "animate in the most obvious way"
- Returns a video with sound in approximately 30 seconds

This same workflow was used to generate all interstitial scenes for a 32-minute film, with the skill even launching a localhost browser-based editor for real-time refinement.

**Image generation wrapper**: A Python-based skill wraps the Imagen API with intelligent prompt enhancement, reducing generation time to under 7 seconds and enabling consistent style application across a project.

### Developer Productivity Tools

**Code review automation**: Skills that load framework-specific best practices and organizational conventions provide consistent code review across team members. One engineer noted using a Codex skill to have OpenAI's model review Claude's output automatically, eliminating manual copy-paste between tools.

**Git analysis and repository health**: The workshop's example "repo roast" skill demonstrates analyzing repositories for:
- Stale TODOs and technical debt
- Code churn hotspots indicating fragile areas
- Bus factor analysis (commit concentration by author)
- Commit quality and convention adherence
- README accuracy and drift from actual code

**Slack-to-Linear automation**: A skill monitors Slack for work requests, checks Linear for duplicate tickets, and creates new tickets automatically, eliminating context-switching overhead for developers trying to maintain flow.

## Evaluation and Quality Assurance

WorkOS implements formal evaluation frameworks for production skills, particularly those in their public repository. The evaluation approach includes:

**Baseline comparison**: Running tasks with and without the skill to measure improvement. Skills must demonstrate measurable benefit over the model's baseline capabilities.

**Rubric-based scoring**: Skills are evaluated against confidence thresholds (typically 80-90% success rate) across multiple test runs. If a skill fails to meet the threshold or performs worse than baseline, it fails the evaluation.

**Model evolution tracking**: As new models release, skills are re-evaluated to ensure they still provide value. In one case, evaluation revealed that a Next.js skill was actually degrading performance because Claude had become inherently proficient with Next.js and the skill's prescriptive instructions were counterproductive.

**Continuous improvement loop**: The recommended workflow is:
- Build initial skill (manually or with skill-builder tools)
- Use skill in production for several days to a week
- Analyze conversation transcripts (stored locally in JSONL files) to identify edge cases, failures, and inefficiencies
- Iterate on the skill based on empirical usage data
- Re-evaluate and deploy updated version

The evaluation framework is described as "fuzzy math" - not scientifically rigorous but providing directional guidance similar to fitness tracking. The value is in establishing baselines and tracking relative improvement.

## Multi-Model and Multi-Environment Support

A key advantage emphasized is that skills work across multiple LLM providers and tools:
- **Model providers**: Claude, Cursor, Codex, and others that support the skills format
- **Interfaces**: Command-line tools (Claude Code), desktop applications (Claude Desktop), web interfaces, and programmatic SDKs
- **Technical levels**: Both engineers writing code and non-technical team members performing business workflows

This portability is achieved through the simple markdown-based format with minimal provider-specific dependencies. Skills become organizational knowledge artifacts that transcend specific tooling choices.

## Team Collaboration Challenges

The workshop surfaced significant real-world challenges in scaling skills across organizations:

**Version control and governance**: With 60 engineers potentially creating skills, questions arise about:
- Where to maintain the canonical skill repository
- How to handle merge requests and reviews for skill modifications
- Managing proliferation of similar skills with overlapping descriptions
- Determining skill ownership and review processes

**Context bloat**: As skill libraries grow, loading all available skills becomes counterproductive. Questions include:
- How to scope skills to relevant teams (frontend vs. backend)
- Whether to implement role-based skill loading
- Managing conflicting skills that might apply to the same situation

**Maintenance over time**: As models evolve, skills may need updating for:
- Verbosity reduction as models become more capable
- Removal of instructions that are now baseline model capabilities
- Adaptation to new model features and capabilities

WorkOS's approach involves multiple skill repositories at different scopes (public, internal organization-wide, team-specific, individual), with plugin-based versioning similar to npm packages. However, this remains an evolving area without fully mature tooling.

## Technical Implementation Details

**Skill structure**: A skill is actually a folder containing skill.md plus any referenced files, scripts, and resources. The folder can be versioned, distributed via git, or packaged as a .skill file.

**Marketplace ecosystem**: Three primary marketplaces were mentioned:
- Official Claude plugins with skill creation and review tools
- Vercel's skills marketplace with CLI and deployment-focused skills
- WorkOS's public skills repository with authentication and migration guides

**Script execution**: When a skill contains script interpolation (`!`command``), the LLM executes the script and replaces the reference with output before continuing. This enables hybrid deterministic-generative workflows.

**Skill calling skills**: While technically possible, the general recommendation is to avoid this pattern as it can lead to unpredictable behavior and maintenance challenges.

**Sub-agents and context management**: For complex workflows, skills can spawn sub-agents with isolated context windows to perform specific tasks (like code review) without bloating the main conversation context. Results are then summarized back to the primary agent.

## Lessons and Best Practices

**Constraints over prescription**: Effective skills provide boundaries and never-do-this rules rather than step-by-step instructions, allowing the LLM flexibility in execution while maintaining quality guardrails.

**Ask the LLM**: When uncertain about skill design, routing logic, or improvements, asking the LLM to analyze and suggest improvements is often the fastest path to better results. The skill-builder skill in Claude is specifically designed for this meta-task.

**Minimal viable skills**: Skills can be as simple as 30 lines of markdown and still provide significant value. Starting small and iterating based on usage is more effective than trying to create comprehensive skills upfront.

**Progressive disclosure is key**: Rather than front-loading all possible context, use conditional loading to provide detailed information only when the specific subtask requires it.

**Context is gold**: All conversation transcripts, including failures and frustrations, represent valuable data for skill refinement. The development workflow should preserve and analyze this data rather than discarding it.

**Voice and workflow integration**: While not strictly part of skills, the presenters demonstrated integration with tools like Whisper Flow for voice-based coding, showing how skills fit into broader agentic development workflows.

## Organizational Impact

The skills framework represents a shift in how LLM knowledge is managed within organizations:
- **From documentation to executable knowledge**: Instead of Notion docs describing conventions, skills encode and enforce them
- **Democratization of complex workflows**: Non-technical team members can execute sophisticated multi-step processes through simple prompts
- **Institutional memory**: Skills capture effective patterns and evolve with organizational learning
- **Reduced onboarding friction**: New team members inherit accumulated knowledge through skills rather than tribal knowledge transfer

The workshop format itself (teaching skills creation through building a "repo roast" skill) demonstrates the pedagogical value of the framework for sharing LLMOps knowledge across teams.

## Future Directions

Several emerging patterns and potential developments were discussed:

**Agent teams vs. sub-agents**: The ecosystem is developing multiple abstractions for multi-agent coordination, with skills potentially serving as the reusable building blocks

**Memory and dreaming**: Integration with long-term memory systems (like Claude's autodream feature) could enable skills to evolve autonomously based on usage patterns

**CLI as skill delivery**: The pattern of wrapping skills in zero-friction CLI tools that handle authentication and model access could become a standard distribution mechanism

**Biometric integration**: Experimental work monitoring developer biometrics to provide health and wellness interventions suggests skills might expand beyond purely technical domains

**Skill marketplaces maturation**: As version control, scoping, and distribution tooling improves, skill marketplaces may become as central to LLMOps as package managers are to traditional development

This case study illustrates how WorkOS has moved beyond point-in-time prompt engineering to create a systematic framework for managing LLM capabilities in production, addressing key LLMOps challenges around consistency, team collaboration, evaluation, and the integration of deterministic and generative components.
