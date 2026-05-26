---
title: "Scaling an AI-Powered Vibe Coding Platform from 1 to 80 Engineers"
slug: "scaling-an-ai-powered-vibe-coding-platform-from-1-to-80-engineers"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "a2a"
  - "evals"
  - "agent-based"
  - "human-in-the-loop"
  - "few-shot"
  - "cicd"
  - "monitoring"
  - "documentation"
  - "open-source"
  - "postgresql"
  - "mysql"
  - "sqlite"
  - "redis"
  - "cache"
  - "anthropic"
  - "microsoft-azure"
industryTags: "tech"
company: "Base44"
summary: "Base44, a vibe coding platform that enables anyone to build software, scaled rapidly from a solo founder to 80 engineers following acquisition by Wix in 2025. The team faced challenges around onboarding, code review, quality assurance, and experimentation at scale. They addressed these by leveraging Claude and AI-assisted workflows throughout their development lifecycle: using prompts to auto-generate onboarding documentation from commit history, automating PR reviews based on historical feedback patterns, implementing frustration-level monitoring as a proxy for agent quality, building user simulators for evaluation, and creating AI-powered QA testing that could handle complex edge cases. The solutions enabled them to maintain velocity while scaling rapidly, with features that previously would have taken weeks being completed in days by newly onboarded engineers."
link: "https://www.youtube.com/watch?v=VueeyKcquoA"
year: 2025
seo:
  title: "Base44: Scaling an AI-Powered Vibe Coding Platform from 1 to 80 Engineers - ZenML LLMOps Database"
  description: "Base44, a vibe coding platform that enables anyone to build software, scaled rapidly from a solo founder to 80 engineers following acquisition by Wix in 2025. The team faced challenges around onboarding, code review, quality assurance, and experimentation at scale. They addressed these by leveraging Claude and AI-assisted workflows throughout their development lifecycle: using prompts to auto-generate onboarding documentation from commit history, automating PR reviews based on historical feedback patterns, implementing frustration-level monitoring as a proxy for agent quality, building user simulators for evaluation, and creating AI-powered QA testing that could handle complex edge cases. The solutions enabled them to maintain velocity while scaling rapidly, with features that previously would have taken weeks being completed in days by newly onboarded engineers."
  canonical: "https://www.zenml.io/llmops-database/scaling-an-ai-powered-vibe-coding-platform-from-1-to-80-engineers"
  ogTitle: "Base44: Scaling an AI-Powered Vibe Coding Platform from 1 to 80 Engineers - ZenML LLMOps Database"
  ogDescription: "Base44, a vibe coding platform that enables anyone to build software, scaled rapidly from a solo founder to 80 engineers following acquisition by Wix in 2025. The team faced challenges around onboarding, code review, quality assurance, and experimentation at scale. They addressed these by leveraging Claude and AI-assisted workflows throughout their development lifecycle: using prompts to auto-generate onboarding documentation from commit history, automating PR reviews based on historical feedback patterns, implementing frustration-level monitoring as a proxy for agent quality, building user simulators for evaluation, and creating AI-powered QA testing that could handle complex edge cases. The solutions enabled them to maintain velocity while scaling rapidly, with features that previously would have taken weeks being completed in days by newly onboarded engineers."
notion:
  pageId: "366f8dff-2538-8039-ae27-cd535fb35b15"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-20T15:42:00.000Z"
  lastEditedTime: "2026-05-20T15:42:00.000Z"
  publishedAt: "2026-05-20T15:45:40Z"
---

## Overview

Base44 is a vibe coding platform designed to enable both technical and non-technical users to build software applications. The company was founded by a solo engineer named Mar at the end of 2024, and by early 2025 had already achieved product profitability. Following rapid traction and user growth, Base44 was acquired by Wix in April 2025, which saw synergies with their similar user base. The acquisition triggered dramatic scaling from a 2-person team to 15 engineers initially, and eventually to 80 engineers after merging with another vibe coding product. This case study chronicles how Base44 leveraged AI-assisted development practices and LLMOps throughout their growth journey to maintain engineering velocity despite rapid headcount expansion.

The case study is particularly interesting because it demonstrates pragmatic, incremental adoption of LLMOps practices tailored to team size and maturity. The team explicitly embraced simplicity and avoided over-engineering solutions before they were needed, while still maintaining high velocity and quality standards.

## Phase 1: Scaling from 1 to 15 Engineers

### Onboarding Automation Through Prompt Engineering

When scaling from a solo founder to a 15-person engineering team, Base44 faced the classic challenge that manual onboarding doesn't scale. Rather than building elaborate documentation systems or processes, they took a radically simple approach by leveraging Claude Code to generate onboarding materials dynamically from the codebase itself.

Each new engineer was given two simple prompts to run before starting their work. The first prompt asked Claude to review all commits and summarize what everyone cares about, effectively creating a real-time organizational map showing which engineers owned which areas and what their focus was. The second prompt asked Claude to generate Mermaid charts explaining how specific components work. This approach had the advantage of always being current, as it generated documentation from the actual code state rather than requiring manually maintained documents that could become stale.

The simplicity of this approach is notable—no onboarding committee, no documentation maintenance process, just two prompts that give new engineers comprehensive context. This reflects a key philosophy throughout Base44's approach: keeping processes extremely lean while leveraging AI to provide value that would traditionally require significant human overhead.

### Automated Code Review Based on Historical Patterns

The founder Mar was extremely cautious about what code entered the Base44 backend and agent systems, creating a bottleneck as he wanted to personally review every pull request. Rather than immediately building complex automated review systems, Base44 leveraged their existing data—the pool of PR comments Mar had already written over the first few weeks.

They used Claude to analyze this corpus of review feedback and extract the most important patterns and crucial considerations that needed to be maintained in new code. These distilled guidelines were then incorporated into automated PR review instructions that ran regularly. This effectively allowed Mar's code quality standards to be encoded and applied at scale without requiring his personal attention on every PR.

The impact was substantial. One notable example involved a WhatsApp integration feature assigned to a new engineer on Thursday night. The team expected this complex integration—requiring work on the agentic flow, Meta API integration, and multiple system components—to take one to two weeks. Instead, by Sunday morning, the feature was complete. The engineer had onboarded using the simple prompts, built the feature with AI assistance, and passed automated PR review with only minor comments. This represented a dramatic acceleration in development velocity enabled by their AI-augmented workflows.

### Production Monitoring Through Frustration Detection

As the team scaled, they could no longer rely on manually sitting with customers to understand whether the Base44 agent was working well in production. Like many AI companies, their initial instinct was to build a comprehensive evaluation suite, but they recognized that a 15-person team wasn't ready for such a significant investment.

Instead, they leveraged the data they already had: production conversation logs. Through observing actual usage patterns, they identified a simple but powerful signal—when the agent is working well, users typically move from feature to feature silently, but when things break, users become vocal in the chat expressing frustration with statements like "Why is this broken?" or "I can't believe it's not working."

Base44 built a lightweight classification system using Claude with the Haiku model to classify each user message based on frustration level. For any new agent version they wanted to release—whether involving infrastructure changes, prompt modifications, or model swaps—they would route a small percentage of users to that version and track frustration levels compared to the baseline. This gave them a continuous monitoring system for agent quality without needing to build comprehensive evaluation datasets or complex testing infrastructure.

This approach demonstrates a pragmatic middle ground between no monitoring and over-engineered solutions. By identifying a proxy metric that was easy to detect and correlated with actual user experience, they could make data-driven decisions about agent releases while keeping the system simple.

## Phase 2: Scaling from 40 to 80 Engineers

### Experimentation Framework with AI-Generated Guidelines

As Base44 doubled from 40 to 80 engineers in a single night through team merges and external hiring, they faced new challenges around standardizing experimentation practices. The team needed a way for engineers to understand which changes required A/B testing, which could be gradually rolled out, and which could be shipped immediately—but they had never formally documented these decision criteria.

Rather than forming a multi-stakeholder committee to draft guidelines through lengthy meetings, they used their past actions as the source of truth. Base44 connected Claude Code to Posthog (their A/B testing platform) via MCP and analyzed their last 100 experiments along with matching pull requests. Claude distilled their implicit decision-making patterns into explicit guidelines that captured when experiments were needed, how long they should run (ranging from 7 days for smaller features to a full month for changes that might affect conversion or premium rates), and what KPIs to monitor.

This AI-generated first draft wasn't perfect but provided a working document they could iterate on within hours rather than weeks. They then automated the process so that when any pull request was opened, an automated system would evaluate whether it needed experimentation, post comments on GitHub with the verdict, and automatically create experiments in Posthog when needed.

To provide visibility across the organization, they built a central dashboard using Base44 itself, connected to BigQuery (their data warehouse), Posthog, GitHub, and other systems. This gave everyone visibility into running experiments, their impact on key metrics, AI costs, and app publishing rates. This approach effectively encoded product management intuition into an automated system that could scale with the team.

### Building an Evaluation Suite at the Right Time

Base44 had intentionally avoided building comprehensive evaluation infrastructure during their earlier growth phase because it wasn't the right ROI for a small team. However, at 80 engineers, they recognized that evaluation was becoming critical—but they still wanted to deliver value quickly without pulling top AI engineers off feature development for months.

The key insight was understanding what they actually needed to evaluate. Rather than just checking model outputs, they realized they needed to evaluate the correctness of the full apps that users were building. This required building a user simulator that could interact with Base44 the way real users do. Importantly, they recognized that if one part of a generated app doesn't work, that shouldn't automatically fail the evaluation—instead, the eval suite needs to feed that rejection back to the agent and ask it to fix the issue, mirroring how real users interact with the system.

They built a CI/CD pipeline where any change to AI code spins up a real Base44 app instance and uses Stagehand to simulate real user actions—essentially creating an automated QA engineer in a containerized environment. Their canonical "smoke test" eval is a Hello World app that doesn't just check if the app works, but walks through a full user flow: requesting the app, asserting the right text is visible, asking for a small text change, and then requesting a small feature addition. Interestingly, these basic evals pass even on the smallest available models.

They also built more complex evaluation scenarios including starting with existing apps and making many changes, and testing their compaction mechanism (which handles long conversation contexts). They created an internal app using Base44 itself to visualize eval results, showing screenshots and detailed test information, and transparently surfacing cases where the system couldn't test something due to missing capabilities.

This evaluation system represents a mature LLMOps practice implemented at the appropriate scale, balancing comprehensiveness with pragmatism by focusing on user-centric scenarios rather than isolated component testing.

### AI-Powered QA for Edge Cases

While Base44 embraced shift-left quality practices with engineers owning their features, they recognized that some features have complex edge cases that are tedious to test manually—for example, functionality that only affects users at specific subscription tiers when they reach certain credit limits. Traditionally this would require dedicated QA engineers creating feedback loop delays, but Base44 wanted engineers to maintain full ownership while still ensuring deep quality coverage.

They leveraged Claude Code's ability to operate browsers through tools like Playwright MCP and browser automation, but recognized it was missing critical context about Base44-specific workflows, selectors, and events. To address this, they created "skills"—reusable abstractions that taught Claude Code how to perform common Base44 user flows covering the 80% of cases that most features would touch, while trusting Claude to figure out feature-specific testing on its own.

They also created CLI tools that abstracted their APIs and database operations specifically for test setup purposes. This allowed the AI QA agent to efficiently set up complex test scenarios by directly manipulating the database state rather than slowly clicking through the UI—mirroring what a skilled human QA engineer would do.

These capabilities were combined into a meta-skill for proper QA testing. When a pull request is opened, the agent automatically triggers, creates a test plan (another opportunity to use Base44 itself), executes the tests with browser automation, captures screenshots, and reports back with detailed results including what was tested and what couldn't be tested. This works for approximately 80% of cases and successfully shifts complex edge case testing left to engineers while maintaining quality.

## Common Themes and LLMOps Philosophy

Throughout their scaling journey, several themes emerge in Base44's approach to LLMOps:

**Radical Simplicity**: The team consistently chose simple solutions over complex processes, sometimes working hard specifically to avoid building complex systems before they were needed. The eval suite is explicitly mentioned as something they held off on until it was the right moment, then went all-in when the time came.

**Taste Encoding Through Historical Data**: Rather than trying to articulate intuitions or guidelines through committee work, Base44 repeatedly leveraged past actions to encode team and company taste. By analyzing historical commits, PR comments, and experiments, they could extract implicit patterns and make them explicit through AI assistance. This approach recognizes that actions reveal true priorities better than aspirational documentation.

**Dogfooding for Insight**: Base44 consistently used their own platform to build the internal tools supporting their LLMOps practices—the experimentation dashboard, eval visualization, QA test planning, and more. This created a tight feedback loop where they experienced their product the way users do, leading to better insights and faster iteration.

**Moving Bottlenecks**: The team recognized that solving one scaling challenge simply shifts the bottleneck elsewhere. They mention that their current challenges include scaling the processes they've built and implementing proper post-validation to ensure deployed features actually move business metrics and don't introduce issues—closing the loop from development through production impact.

**Appropriate Tooling for Team Size**: A key insight is that LLMOps practices must match team maturity. What works for a 5-person team (simple prompts for onboarding) isn't sufficient for 80 engineers (requiring formal evaluation and experimentation frameworks), and over-investing in infrastructure too early wastes resources better spent on product development.

## Critical Assessment

While the case study presents an impressive scaling story, several caveats warrant consideration:

The team's reliance on production data and proxy metrics (like frustration detection) rather than comprehensive pre-release evaluation could potentially miss certain classes of problems before they reach users. While the frustration metric is clever, it's a lagging indicator that requires users to experience problems before detection. However, their pragmatic argument that this was appropriate for their team size at that stage is reasonable.

The rapid development timelines mentioned (like the WhatsApp integration completed in a weekend) are impressive but the case study doesn't deeply explore potential quality tradeoffs or technical debt accumulation. Fast iteration enabled by AI assistance is valuable, but the long-term maintainability implications aren't discussed.

The approach of extracting guidelines from historical actions assumes that past behavior represents ideal behavior, which may not always be true—it could also encode and scale past mistakes or biases. The team does mention that Claude's first draft was "rough on the edges" requiring iteration, suggesting some awareness of this limitation.

The heavy reliance on Claude Code and Anthropic's ecosystem (including MCPs) creates vendor lock-in, though this is a common tradeoff when leveraging cutting-edge AI developer tools. The case study would benefit from discussion of fallback plans or multi-model strategies.

That said, the overall approach is remarkably thoughtful and well-suited to the challenges of scaling an AI-native company. The emphasis on simplicity, the willingness to wait for the right moment to invest in infrastructure, and the creative use of existing data to bootstrap systems are all valuable lessons for organizations navigating similar growth trajectories.
