---
title: "Building a Visual Agentic Tool for AI-First Workflow Transformation"
slug: "building-a-visual-agentic-tool-for-ai-first-workflow-transformation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "698add3c1b065e237922c380"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-10T11:06:51.158Z"
  lastUpdated: "2026-02-10T07:51:34.248Z"
  createdOn: "2026-02-10T07:24:44.979Z"
llmopsTags:
  - "customer-support"
  - "code-generation"
  - "document-processing"
  - "chatbot"
  - "poc"
  - "content-moderation"
  - "prompt-engineering"
  - "rag"
  - "few-shot"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "system-prompts"
  - "mcp"
  - "evals"
  - "langchain"
  - "fastapi"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "cicd"
  - "orchestration"
  - "anthropic"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Craft"
summary: "Craft, a five-year-old startup with over 1 million users and a 20-person engineering team, spent three years experimenting with AI features that lacked user stickiness before achieving a breakthrough in late 2025. During the 2025 Christmas holidays, the founder built \"Craft Agents,\" a visual UI wrapper around Claude Code and the Claude Agent SDK, completing it in just two weeks using Electron despite no prior experience with that stack. The tool connected multiple data sources (APIs, databases, MCP servers) and provided a more accessible interface than terminal-based alternatives. After mandating company-wide adoption in January 2026, non-engineering teams—particularly customer support—became the heaviest users, automating workflows that previously took 20-30 minutes down to 2-3 minutes, while engineering teams experienced dramatic productivity gains with difficult migrations completing in a week instead of months."
link: "https://newsletter.pragmaticengineer.com/p/ai-first-makeover-craft"
year: 2026
---

## Overview

Craft is a documentation and note-taking startup founded in 2020 that has built a substantial user base of over 1 million active users and more than 50,000 paying customers. With a lean engineering team of 20 people who have a median tenure of nearly four years, Craft has been recognized for engineering excellence, winning Apple's Mac App of the Year in 2021. The case study documents their three-year journey of AI experimentation that initially failed to achieve product-market fit, followed by a dramatic transformation in late 2025 and early 2026 when they built and deployed "Craft Agents," a visual agentic tool that fundamentally changed how both engineering and non-engineering teams work.

This case represents an interesting counterpoint to AI hype cycles because Craft consciously resisted shipping AI features that would be mere gimmicks. The founder explicitly wanted to avoid what he termed the "Copilot fail" moment, where Microsoft rolled out Copilot across its product suite only to have it associated with uselessness. Craft waited for a genuine "wow" moment before committing fully to AI transformation. The breakthrough came in December 2025 and January 2026, leading to company-wide adoption of AI-powered workflows that have delivered substantial productivity improvements, particularly for non-technical teams.

## Three Years of Experimentation Without Product-Market Fit

Craft's AI journey began in 2022 when they launched an AI assistant just two days before ChatGPT's public release, and weeks before Notion's competing product. This early implementation was technically straightforward: it used OpenAI's GPT-3.5 API running through an AWS gateway that acted as an authentication proxy, with HTTP streaming for responses. The technical constraints were significant—the context window was limited to 4,096 tokens, and the interaction model was one-shot with no conversational capability.

While the AI assistant drove substantial initial user growth, with many users downloading Craft specifically to experiment with it, the feature lacked stickiness. After the initial engagement spike, users didn't return to the AI assistant repeatedly, indicating it wasn't solving real problems. This pattern of initial interest followed by abandonment is a critical signal in LLMOps that a feature hasn't found genuine product-market fit.

Throughout 2023 and 2024, the team continued experimenting with various AI applications including knowledge-based search using RAG techniques, summarization capabilities, and retrieval features. None of these experiments achieved the stickiness the team was looking for. Importantly, the company held an internal AI-focused hackathon in September 2023 with approximately 80% staff participation across all functions including designers, product managers, and customer support. While this demonstrated organizational enthusiasm and willingness to experiment, it still didn't produce the breakthrough product experience they needed.

The turning point came in December 2024 with the release of reasoning models like OpenAI's GPT-4o. The founder spent two weeks experimenting and had his first "wow" moment as a software engineer. A highly requested feature for recognizing hand-drawn shapes—estimated to take several weeks to implement traditionally—was completed in a single day using the 4o model. This was the first time Craft shipped a feature they genuinely couldn't have built without AI in a reasonable timeframe.

Following this breakthrough, Craft assigned five senior engineers from their 20-person team to experiment full-time with AI for six months. This represents a significant resource commitment—25% of the engineering team dedicated to AI exploration. During this period, they built a mobile-first agent called "Chaps" (similar to Peter Steinberger's Clawd bot) that was never publicly released. However, the team accumulated valuable knowledge about tool calling and orchestration patterns that they ported back into the Craft AI assistant. By October 2025, the founder concluded that agents worked "pretty well" but weren't ready as standalone products. In December 2025, they shipped major updates to the AI assistant that significantly improved stickiness, though it still wasn't the transformational experience they sought.

## The Breakthrough: Building Craft Agents

In December 2025, the founder wanted to use more advanced models like Opus 4.5 through Claude Code, so he built a prototype terminal UI (TUI) on top of the Claude Agent SDK—a framework for building production-ready agents with Claude Code as a library. This tool, initially called "Craft Terminal," connected Craft Docs as a data source to Claude Code and worked surprisingly well for organizing messy workspaces, searching, and extracting insights. The performance exceeded any previous knowledge base lookups the team had built.

The customer service team began using Craft Terminal for their workflows, which typically involved checking Zendesk tickets, consulting runbooks in Craft, and accessing various databases. To support this broader workflow, the founder added a crucial concept called "Sources"—the ability to connect multiple data sources including APIs, databases, and MCP (Model Context Protocol) servers alongside Craft Docs. The implementation for API sources is particularly clever from a security perspective: an API source acts like an MCP server to the agent, but Craft Agents intercepts requests and adds necessary credentials without exposing them to the agent itself.

However, beta users complained about the terminal interface. Non-technical users found multitasking painful, reviewing complex plans awkward, and the entire experience felt "locked away" from those without developer backgrounds. This feedback prompted the founder to ask whether the terminal could be reimagined as something more natural, like an email client or Slack interface.

During the 2025 Christmas holidays, the founder gave himself two weeks to build a full UI on top of Claude Code using Electron—a technology stack he had never used before. This was both an experiment in what AI could enable and a personal challenge. Previously, building v1 of Craft Docs took him up to four months, but he theorized that with AI assistance he could complete a polished application in an unfamiliar stack within two weeks. He set this as a test: success would prove AI had reached an inflection point that warranted company-wide adoption of AI coding tools, while failure would at least provide learning about model capabilities.

By January 5, 2026, the founder had completed Craft Agents—a polished application running on Mac, Windows, and Linux thanks to Electron's cross-platform capabilities. The tool went far beyond a simple UI wrapper for Claude Code. Key technical features included:

- A "sources" architecture for connecting diverse data sources (databases, APIs, MCP servers) to the agent
- Support for running parallel agents with visualization and easy switching between conversations
- A workflow system implemented through labels
- A comprehensive permissions system with three modes: readOnly "explore," "ask to edit" requiring confirmation, and "auto" for autonomous edits
- Extension of Claude Code's "skills" concept for defining reusable capabilities
- Theming options (added because time permitted)

The permissions system is particularly important for production use of non-deterministic LLM systems. The default "Explore" mode ensures agents can only read data sources, preventing accidental writes. The "Ask to Edit" mode provides a safety layer for operations that modify data, while "Auto" mode enables fully autonomous operation for trusted workflows. This graduated permissions model addresses one of the core challenges in LLMOps: balancing AI autonomy with safety and control.

On January 19, 2026, approximately one month after writing the first line of code, Craft open-sourced the tool under the permissive Apache License 2.0, making it freely available for others to use, modify, and distribute.

## Non-Engineering Teams as Power Users

One of the most surprising outcomes was that non-engineering teams became heavier users of Craft Agents than developers. Most engineers remained satisfied with Claude Code's terminal interface, though some adopted Craft Agents for its superior multitasking with parallel chats and more pleasant interface for reviewing lengthy code changes.

The customer support team emerged as the heaviest users, building sophisticated workflows within just two weeks. Their workflows include:

- **Bug triaging**: Parallel agents process large batches of customer tickets simultaneously, providing completion reports when done
- **Bug processing**: Incoming user reports are validated against source code, root causes are identified, and context is added for engineering teams
- **Daily updates**: Automated summaries of work completed
- **Education license verification**: Checking whether domains requesting free access are legitimate academic institutions

The bug processing workflow exemplifies sophisticated LLMOps practices. A defined "skill" called "bug report processor" specifies data sources (Zendesk and Linear), required output structure (structured analysis with tags and categories), and detailed instructions for the agent to:

- Identify the platform and area where bugs belong and apply appropriate tags
- Cross-reference with Linear (their issue tracking system) to find similar existing issues or create new ones
- Assign issues to relevant developer teams
- Perform technical root cause analysis
- Draft customer-ready responses
- Create engineering tickets with code references where applicable

Data enrichment is used in almost every workflow through a "Get User Data" skill that calls Craft's backend API to look up user profiles, plan types, billing status, feature flags, and usage metrics based on the email address in Zendesk fields. This eliminates context switching and manual lookups that previously slowed support workflows.

The customer experience lead reported that tickets previously taking 20-30 minutes now take 2-3 minutes to process. More importantly, the team can now handle a much larger volume of tickets than before, and they escalate issues to engineers far less frequently because the agent performs technical validation and code analysis automatically. The agent can also determine whether bugs reported on older app versions have been fixed by examining code changes, eliminating the need for manual reproduction testing.

Beyond customer support, other non-engineering teams built their own use cases:

- **Marketing**: A marketing intern started using Craft Agents to build and modify websites independently, eliminating the need for web engineer rotation support that was previously dreaded by engineers and felt insufficient by marketing
- **HR**: Built a Bamboo HR plugin handling age-based holiday allocations required by Hungarian law, plus automations for generating payroll-compatible files that were previously done manually
- **Finance**: Created a tool that exports Revolut business account data to CSV, cross-references it with invoice posts in the employee Slack channel, and generates formatted output for the accounting system

The fact that non-technical teams are building integrations and automations previously requiring developer support represents a significant shift in how technical capability is distributed across organizations. One customer support person even instructed Craft Agents to design a custom Matrix-themed UI, and these custom themes started proliferating across the office—an example of emergent creative use cases.

## Changing How Software is Built

The engineering team's approach to building software has also evolved significantly. Traditional workflows involved planning, coding, code review, and deployment. With AI assistance, several practices are changing:

- **Fast iteration without traditional code reviews**: The speed of development has increased dramatically, with some engineers bypassing traditional PR review processes
- **Rejecting pull requests but "weaving in" ideas**: Rather than accepting external contributions directly, the team takes the concepts and rebuilds them using AI, maintaining consistency while incorporating community ideas
- **Reduced reliance on SDKs during development**: AI agents can work directly with APIs rather than requiring language-specific SDK wrappers

The productivity gains are dramatic. Difficult migrations that would traditionally take months are now completing in a week. The organization has shifted to "one-person responsibility squads" where individuals can own larger scopes of work than previously possible. However, this rapid change has created challenges—some developers have struggled with the pace of change, and a few have even quit as a result.

The case study mentions that some engineers are experiencing workflow disruption as expectations and practices evolve quickly. This human factor is an important consideration in LLMOps transformations: while AI tools can dramatically increase capability, they also require significant adaptation from teams and individuals, and not everyone adapts at the same pace or finds the new workflows preferable.

## Open Source and "Remixing"

Since Craft Agents was released under Apache 2.0, users have already begun forking and modifying the codebase for their own needs. One researcher, Lisa Skorobogatova, remixed Craft Agents by instructing the agent to modify its own code to support project organization and drag-and-drop functionality for moving chats into projects. This represents an emerging pattern the case study calls "remixing"—using AI agents to modify open source tools to fit specific needs, rather than manually forking and coding changes.

This approach to customization could represent a shift in how open source software evolves. Rather than requiring programming skills to fork and modify tools, users can potentially describe desired changes and have agents implement them. The permissive Apache 2.0 license facilitates this by allowing unrestricted modification and distribution with minimal requirements.

## Technical Architecture and LLMOps Considerations

From an LLMOps perspective, several aspects of Craft's approach are noteworthy:

**Model Selection and Evolution**: Craft started with GPT-3.5 in 2022, experimented with various models through 2023-2024, found breakthrough moments with GPT-4o reasoning models in late 2024, and ultimately built their agent system on Claude's models (Opus 4.5) in late 2025. This evolution reflects the rapid pace of model capability improvement and the importance of continuously reassessing which models best serve specific use cases.

**Inference Infrastructure**: Early implementations used AWS gateways as authentication proxies with HTTP streaming. By leveraging commercial APIs (OpenAI, Anthropic) rather than self-hosting models, Craft avoided infrastructure complexity and could focus on application-layer innovation. This is a common pattern for startups where the economics of commercial API access are favorable compared to operating model infrastructure.

**Context Management**: Early GPT-3.5 implementations were severely constrained by 4,096-token context windows, requiring careful prompt engineering to squeeze necessary context within limits. Modern implementations with larger context windows (100k+ tokens for Claude) enabled much more sophisticated use cases like searching across entire documentation workspaces and analyzing source code for bug reports.

**Tool Calling and Orchestration**: The six-month period with five senior engineers experimenting with agents built organizational knowledge about tool calling and orchestration patterns. This investment in understanding agent architectures paid off when building Craft Agents, as the team could implement sophisticated skills, parallel agent execution, and data source integration.

**Security and Permissions**: The credentials interception pattern where API sources act as MCP servers but Craft Agents adds credentials without exposing them to the agent is a thoughtful security design. The three-tier permissions system (Explore/Ask to Edit/Auto) provides graduated autonomy appropriate for different risk levels and use cases.

**Skills and Reusability**: The extension of Claude Code's skills concept to define reusable capabilities with specific data sources, instructions, and output formats enables non-technical users to create structured workflows. This abstraction layer is crucial for democratizing agent capabilities beyond developers.

**Parallel Execution**: Support for parallel agents addresses a key limitation of sequential LLM interactions—the ability to process multiple independent tasks simultaneously. This is particularly valuable for batch operations like ticket triaging where throughput matters.

**Observability**: The visual interface provides better observability than terminal interfaces for reviewing agent plans, understanding what actions were taken, and scrolling through lengthy code changes. This improved observability is critical for trust and debugging in production LLM systems.

## Business and Strategic Implications

The case study discusses several strategic implications of AI transformation:

**Vendor Switching Becomes Easier**: Craft is considering switching from Zendesk to an API-first vendor because their agents can now interact directly with APIs rather than requiring purpose-built integrations. This suggests that AI agents may reduce switching costs and vendor lock-in by providing a flexible integration layer.

**Enterprise vs. Consumer Feature Parity**: Capabilities that were previously enterprise-only could become standard consumer offerings when AI reduces the cost and complexity of implementation. This could compress pricing tiers and change competitive dynamics.

**Hiring Freezes During Transition**: The prediction that companies might freeze hiring while figuring out new AI-enabled workflows reflects genuine uncertainty about future staffing needs when productivity increases dramatically.

**Death of Pull Requests**: The suggestion that traditional PR-based open source contribution models might decline if maintainers can "remix" ideas using AI rather than reviewing and merging community code would represent a significant shift in collaboration patterns.

**Developer Impact Differentiation**: Engineers who prioritize impact over specific technologies or processes may thrive, while those attached to traditional workflows may struggle with rapid change.

## Critical Assessment and Balanced Perspective

While the case study presents impressive results, several considerations warrant critical examination:

**Selection Bias and Halo Effects**: The article was written by the founder's brother, creating potential for overstated benefits or underreported challenges. The fact that some developers quit due to rapid change is mentioned but not explored in depth. The full costs and difficulties of transition may not be fully captured.

**Durability of Productivity Gains**: The improvements were measured over just a few weeks in January 2026. Longer-term studies will be needed to determine whether productivity gains persist, whether quality issues emerge from faster development, and whether the reduced code review process creates technical debt or bugs that aren't immediately apparent.

**Generalizability**: Craft is a well-run, mature startup with a small, experienced team (median tenure of four years) and a culture of engineering excellence. The results may not generalize to larger organizations, less experienced teams, or different organizational cultures. The founder's personal technical skills and ability to build Craft Agents in two weeks is not representative of typical engineering leaders.

**Model Dependency**: The entire transformation depends on continued access to frontier models from commercial providers (Anthropic, OpenAI). Pricing changes, capability regressions, or availability issues could significantly impact workflows that have become dependent on these tools.

**Quality and Accuracy**: While the case study mentions the permissions system to prevent accidents, there's limited discussion of error rates, hallucinations, or instances where the AI produced incorrect results. The customer support team's ability to process tickets in 2-3 minutes instead of 20-30 minutes is impressive, but the quality of those interactions compared to previous manual processes isn't fully explored.

**Non-Engineering Adoption Context**: The high adoption by non-technical teams is impressive but may reflect the specific nature of Craft's culture and the quality of onboarding and skill definitions. Many organizations struggle to get non-technical users to adopt AI tools effectively.

**Cost Analysis**: There's no discussion of the financial costs of operating these agent workflows at scale. Running Claude Opus 4.5 repeatedly for every customer support ticket, bug triage, and workflow automation could represent significant API costs compared to previous manual processes.

Despite these caveats, the case study provides valuable insights into how a well-run technical organization can achieve genuine productivity improvements by thoughtfully applying AI agents to real workflows. The multi-year experimentation that preceded the breakthrough, the conscious avoidance of shipping gimmicky features, and the sophisticated LLMOps practices around permissions, skills, and data source integration represent a mature approach to AI transformation. The fact that non-engineering teams became the heaviest users suggests the tool successfully abstracted away technical complexity while providing genuine value, which is a meaningful achievement in making AI accessible beyond developer populations.

The open-sourcing of Craft Agents also provides value to the broader community by offering a working example of production agent architecture built on commercial LLM APIs with thoughtful considerations for security, permissions, parallel execution, and workflow management. Whether this specific tool gains broader adoption or not, it represents a data point in how organizations are building practical LLMOps infrastructure for real business workflows in 2026.