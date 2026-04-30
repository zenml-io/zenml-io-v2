---
title: "Building an AI-Powered Software Factory with Autonomous Code Generation and Review"
slug: "building-an-ai-powered-software-factory-with-autonomous-code-generation-and-review"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "content-moderation"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "few-shot"
  - "error-handling"
  - "mcp"
  - "cicd"
  - "docker"
  - "kubernetes"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "monitoring"
  - "security"
  - "guardrails"
  - "open-source"
  - "documentation"
  - "continuous-integration"
  - "continuous-deployment"
  - "anthropic"
industryTags: "tech"
company: "Twin Sun"
summary: "Twin Sun, a Nashville-based software development agency, built an autonomous software development factory called Scarif that uses Claude Code agents to handle the majority of the software development lifecycle. The system addresses the challenge of scaling development capacity while maintaining code quality and consistency across multiple concurrent client projects. By introducing AI agents incrementally into their existing disciplined development workflow—starting with PR review and gradually expanding to code generation, testing, and deployment—they achieved a 70% autonomous approval rate on pull requests while maintaining their high standards for code quality and design patterns."
link: "https://www.youtube.com/watch?v=kkvi2Rm-K84"
year: 2026
seo:
  title: "Twin Sun: Building an AI-Powered Software Factory with Autonomous Code Generation and Review - ZenML LLMOps Database"
  description: "Twin Sun, a Nashville-based software development agency, built an autonomous software development factory called Scarif that uses Claude Code agents to handle the majority of the software development lifecycle. The system addresses the challenge of scaling development capacity while maintaining code quality and consistency across multiple concurrent client projects. By introducing AI agents incrementally into their existing disciplined development workflow—starting with PR review and gradually expanding to code generation, testing, and deployment—they achieved a 70% autonomous approval rate on pull requests while maintaining their high standards for code quality and design patterns."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-powered-software-factory-with-autonomous-code-generation-and-review"
  ogTitle: "Twin Sun: Building an AI-Powered Software Factory with Autonomous Code Generation and Review - ZenML LLMOps Database"
  ogDescription: "Twin Sun, a Nashville-based software development agency, built an autonomous software development factory called Scarif that uses Claude Code agents to handle the majority of the software development lifecycle. The system addresses the challenge of scaling development capacity while maintaining code quality and consistency across multiple concurrent client projects. By introducing AI agents incrementally into their existing disciplined development workflow—starting with PR review and gradually expanding to code generation, testing, and deployment—they achieved a 70% autonomous approval rate on pull requests while maintaining their high standards for code quality and design patterns."
notion:
  pageId: "352f8dff-2538-80b4-b1f0-c2df586fc803"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T07:29:00.000Z"
  lastEditedTime: "2026-04-30T07:29:00.000Z"
  publishedAt: "2026-04-30T07:34:24Z"
---

## Overview

Twin Sun is a Nashville-based software development agency that positions itself as "fast, fearless, and fully US-based." The company has built what they call a "dark factory" or software factory named Scarif, which represents an ambitious implementation of LLM-powered autonomous software development. The CEO Dave Lane and CTO Jamie Couch have been early practitioners of AI-assisted development, having experimented with these tools since before Claude 3.5 Opus was released.

The core premise of their factory is moving away from humans writing and reviewing every line of code toward an automated pipeline where AI agents handle most development tasks. However, their approach is notably pragmatic rather than idealistic—they openly acknowledge that the system isn't perfect and position AI agents as junior developers or interns that need appropriate supervision and constraints.

## The Scarif Architecture

The Scarif system is structured as a workflow pipeline that mirrors Twin Sun's existing human development process. This deliberate alignment with their established practices proved crucial to adoption and effectiveness. The architecture consists of several key components:

The backend is a Rails application running in AWS that orchestrates the entire workflow. Worker nodes run Claude Code agents in a harness that pulls work from the system, executes it, and reports completion. The integration with Jira was a deliberate choice to maintain continuity with how both human developers and clients track progress. Tasks specified in Jira become inputs to Scarif, allowing mixed human-AI teams to work seamlessly within the same project management framework.

The workflow begins with task specification in Jira. Engineers or product managers create tickets just as they would for human developers. Scarif's workers then pull these tasks through a multi-stage pipeline that includes planning, implementation, code review, evaluation, verification, and conditional deployment.

The planning stage has the agent review the ticket, break it into a plan, ensure it understands the implementation approach, examine existing code, and establish acceptance criteria. This stage feeds forward into the implementation step where the actual code gets written.

Code review happens as a separate stage using a specialized review agent that evolved from their earlier PR bot called "twinsun-dev." This reviewer became so effective that within a week of being allowed to approve PRs autonomously, it was approving approximately 70% of all pull requests across their projects.

An evaluation stage then assesses whether the code review findings require revision or if the work meets acceptance criteria. This isn't an acyclic workflow—there's a cycle counter that allows the system to iterate up to five times between implementation, review, and evaluation before requiring human intervention.

The verification stage ensures CI checks pass, running automated tests, security checks, and accessibility scans. Finally, there's a configurable decision point for deployment. On some projects where the team has high confidence, code automatically merges and deploys. On client-facing projects where developers need to demo features, there's a manual approval gate before merging.

## The Critical Role of Opinions and Constraints

A central insight from Twin Sun's experience is that general-purpose automation doesn't work well, but opinionated, constrained automation can be highly effective. Jamie Couch explicitly states: "We don't have to build a factory that's so general purpose that anyone could use it. We just need one that builds things the way we want them to be built."

This philosophy manifests in several technical implementations. First, they developed a custom Claude Code plugin with skills and agents specifically around their development, debugging, and reviewing practices. This plugin installs automatically on worker nodes and provides a consistent set of capabilities.

Second, they created technology-specific AI rule sets inspired by the Flutter team's approach. These are extensive markdown files that codify best practices and Twin Sun-specific conventions. When setting up a repo, the system detects which platforms are in use and pulls in the appropriate rule sets for Flutter, Rails, Node, PHP/Laravel, or other technologies. These get added to the Claude.md file so agents always have this context available.

Crucially, these rule sets aren't just generic best practices. Jamie describes how they looked at their own base applications and recent work to create Twin Sun-specific sections. For example, they use a somewhat different implementation of the BLoC pattern in Flutter than popular packages do. By encoding these specific patterns in the rule sets, Claude Code follows their existing conventions rather than introducing inconsistent approaches from its general training.

The third constraint comes from their base app templates. Twin Sun does significant greenfield development, and they've evolved sophisticated starter templates over years of work. These templates include pre-built implementations of user management, access controls, Stripe payment integration, push notifications, dashboards, reporting, and dozens of other common features. When Claude Code implements new functionality, it has extensive few-shot examples of the architectural patterns, service class structures, and design conventions Twin Sun uses. This implicit context from the existing codebase provides powerful guidance that supplements the explicit rule sets.

## Evolution of the PR Review Bot

The pull request review capability evolved from optional advisory tool to autonomous approver, and this progression illustrates their incremental adoption philosophy. Over a year ago, Jamie introduced twinsun-dev as an automated PR reviewer. It ran Claude Code behind the scenes with a prompt he iterated on based on team feedback.

In an agency context, PR review has unique challenges. Twin Sun works on many projects concurrently with small teams—often just one or two developers per project. While they have strong coding conventions and common frameworks, most team members lack deep context about applications they didn't build. Traditional PR review focuses on two goals: ensuring code follows sane conventions and is comprehensible, and verifying the implementation matches the specification and makes sense in the business domain.

What they discovered surprised them: based on the task specification and project information it could access, the AI reviewer often had better context than most human reviewers about what a pull request was trying to accomplish. The human review process started feeling like a distraction taking time away from more valuable work.

Team member Justin and others drove iteration on the system, incorporating feedback about hallucinations, coding conventions, and review quality. When they eventually allowed twinsun-dev to approve pull requests autonomously, 70% were approved without human intervention within the first week. On most projects now, this is the standard PR process.

The bot has also begun enforcing practices the team wanted to improve. Twin Sun historically had excellent testing on Rails and backend work but less consistent testing on Flutter frontend code, partly because Dart's strong typing catches many bugs that tests would catch in dynamic languages. Now the review bot rejects pull requests that should have tests but don't, actively improving their testing discipline.

## The Design Review Challenge

While code generation and functional review work well, visual design review remains a significant pain point. As Jamie notes, Claude doesn't see the way humans see. When given a reference design and an implementation screenshot, it struggles with holistic visual comparison.

This matters enormously for Twin Sun because their product development process involves significant design work with clients to establish visual requirements. They can't accept AI-generated interfaces that merely work functionally but look wrong.

Their solution is more time-consuming but produces better results. The design review stage has two components. First, there's an automated extraction of design tokens from Figma and Zeplin—colors, border radius, spacing, and other design system parameters. The system then verifies these match the code configuration, examines the Tailwind configuration, runs the application, and uses Playwright to extract computed CSS on elements to ensure design tokens are used correctly.

Second, rather than comparing full-screen images, the visual review divides the screen into regions, then divides regions into components, and evaluates component-by-component whether the right elements were used and positioned correctly. This decomposition makes the comparison task more tractable for Claude's visual processing capabilities.

Jamie acknowledges this still isn't 100% perfect, but it's dramatically better than doing nothing or trying to compare full screenshots directly. The system also benefits from simply prompting Claude Code to check computed styles and rendered DOM to ensure consistency with the design system, which catches many obvious issues.

There's also an operational challenge: running the application for visual review. Claude Code doesn't reliably clean up after itself, so worker nodes can have port conflicts. Scarif now includes a pre-warming step that scans for blocks of 10 consecutive open ports above 3000 and injects specific port ranges into prompts. This prevents workers on the same machine from conflicting with each other. Jamie humorously notes that Claude can be "very persistent" about getting ports—workers have killed each other's processes to free up ports they wanted.

## Incremental Adoption Philosophy

A major theme throughout the conversation is that you cannot design the entire system and flip it on. Dave Lane's early attempts at building a top-down, general-purpose factory with YAML-based planning configurations consistently produced worse results than Jamie's focused, constrained approach. Dave describes his prototyping as "tracer bullets"—experiments that lit up the space so they could see where to actually aim.

Jamie's approach was to start small and build up. Rather than trying to automate everything at once, they began with one workflow step—PR review—ran it manually until they trusted it, got team feedback, iterated the prompts and implementation, and only then let it run autonomously. Only after that foundation was solid did they expand to automated implementation, then design review, then full pipeline automation.

They explicitly recommend this path for other companies. Jamie suggests starting with pieces you can automate confidently within your existing process. If you have solid automated testing and good code review practices, you can begin automating the code reviews. Once you're confident in those, you don't need human review in every case. Then you can move up the chain—if automated testing is working well and you're confident in code quality, you can let Claude generate code for easier tasks, then progressively harder ones.

Dave adds that low-hanging fruit like security maintenance is an excellent starting point. Rather than core feature development, automate the drudgery nobody wants to do. Dependabot notifications about CVEs can be handled by Claude Code creating PRs overnight that address the vulnerability, ensure tests pass, and present completed work in the morning. This demonstrates value on tasks teams wouldn't prioritize anyway, building trust before moving to more critical work.

## Team Culture and Adoption

Twin Sun's team composition significantly influenced successful adoption. Most of their developers are second-career professionals—former bartenders, musicians, teachers, a law librarian, and Jamie himself with a biochemistry PhD. These individuals already made one major career transition, learned programming traditionally, and then had to adapt again when AI emerged.

This background creates openness to change and willingness to experiment. Dave contrasts this with first-career developers he knows who feel very differently about AI tools and are "too focused on watching the sausage get made"—they want to intervene when Claude does something they wouldn't do personally, even when Claude eventually self-corrects given enough time.

The team's focus on outcomes rather than code itself proved essential. From day one, the expectation is that they care about code quality but prioritize business impact and outcomes over the act of coding. Dave argues that "development has taken a narrower and narrower definition than it should have" and that the Agile Manifesto itself emphasizes communication, collaboration, and achieving outcomes rather than code quality as an end in itself.

This doesn't mean morale wasn't impacted—Dave acknowledges that "developers like to develop" and there's a genuine loss when the satisfying puzzle of coding is automated away. But team members generally accepted or embraced the change because they're "great thinkers" who "look at projects globally" and "think strategically about what's really the right thing to do for clients." The least valuable thing they do is typing out syntax for three hours.

Member Justin and Jack specifically drove improvements to the PR review system, indicating genuine team ownership rather than top-down imposition. The team gave feedback about hallucinations and mismatches with conventions, which shaped the system's evolution.

## Technical Infrastructure Details

The worker nodes architecture is worth examining more closely. Similar to GitHub Actions, there's a harness around Claude Code that pulls work from the central Scarif system. This distributed architecture allows multiple workers to operate concurrently on different tasks across different projects.

The integration with the Model Context Protocol is mentioned, specifically using the Atlassian MCP to interact with Jira for bulk task creation and specification. This represents early adoption of MCP tooling to extend Claude's capabilities into the project management layer.

The custom Twin Sun Claude Code plugin encapsulates institutional knowledge as reusable skills. When a repo is set up to work well with AI, this plugin adds technology-specific rule sets to Claude.md based on automatic detection of the tech stack. This setup task runs once per repository and establishes the guardrails that keep subsequent AI work aligned with Twin Sun's practices.

The CI/CD integration is crucial to the factory's effectiveness. Automated tests, security checks, and accessibility checks all run on every implementation, and failures feed back to the developer agent with context about what went wrong. This creates a feedback loop where Claude can see test failures, understand what broke, revise its approach, and try again—all without human intervention as long as the cycle count stays under the threshold.

Deployment automation is deliberately configurable per project because Twin Sun works across a wide variety of applications with different maturity levels. Some are greenfield projects with excellent test coverage where full automation makes sense. Others are legacy applications brought in by clients that need significant work before the team can trust fully automated deployment.

## Broader Applications and Future Directions

While software development is their primary focus, Twin Sun has begun applying factory concepts to other business functions. Jamie tasked the team with recording audio interviews about projects using a standard set of questions. This raw audio became inputs to an AI pipeline that generated draft case studies and blog posts grounded in real project knowledge they otherwise wouldn't have documented.

These drafts still need human editing to match Twin Sun's voice and language, but they're close because they're translating from the team's own words. This "mini factory for case studies" demonstrates the pattern's broader applicability—identify tasks that involve knowledge work but don't get done due to time constraints, create a structured input format, and automate the bulk of the work while keeping human review and refinement in the loop.

Dave notes wryly that every time they build something, Anthropic releases a better version a month later. Jamie's early demo at AI Tinkerers Nashville had a Slackbot talking to Claude Code to rewrite and redeploy itself—then Anthropic released the official Claude GitHub app. This rapid pace of improvement from foundation model providers creates tension between building custom solutions and waiting for better primitives.

Their response is focusing on doing specific things well rather than building general-purpose systems anyone could use. They just need a factory that builds things the Twin Sun way. This scoped ambition makes the system more achievable and resilient to foundation model changes.

## Critical Assessment and Limitations

The case study presents an optimistic but not uncritical view of AI-powered development factories. Several limitations and challenges are evident throughout:

The design review capability is explicitly described as imperfect and time-consuming despite significant effort. Visual quality remains an area where human judgment is difficult to replicate, and the workarounds are complex.

The system requires substantial upfront investment in establishing patterns, creating rule sets, building base templates, and developing the orchestration infrastructure. Twin Sun benefits from years of disciplined practice and accumulated architectural patterns that make this feasible. Organizations without that foundation would struggle.

The incremental adoption path they recommend acknowledges you cannot simply deploy the entire system at once. Building trust in each component takes time, iteration, and team feedback. This is a multi-month or multi-year journey, not a quick win.

Human oversight remains necessary at multiple decision points. The evaluation stage caps cycles at five before requiring human intervention. Deployment can be gated on human approval. The system works best for organizations that already have strong testing, CI/CD practices, and code review discipline in place.

The morale impact on developers is real, even if Twin Sun's team was relatively receptive. The satisfaction of solving coding puzzles is genuinely lost, and Dave acknowledges this directly rather than dismissing it.

Team composition matters significantly. Twin Sun deliberately hired second-career developers who were already open to change. Organizations with different team profiles might face more resistance.

The system is most effective on greenfield projects using Twin Sun's preferred stack with their base templates and established patterns. Legacy applications and unfamiliar technology stacks present more challenges. Dave mentions the need to sometimes have tracer bullet implementations and cheap experiments to figure out the right approach, particularly in new domains.

Finally, the rapid pace of foundation model development creates ongoing maintenance burden and the risk of obsolescence. What works well with Claude 3.5 Opus may need revision with the next release. Custom solutions might be superseded by better primitives from Anthropic or other providers.

## Key Insights for LLMOps Practitioners

Several insights from Twin Sun's experience translate broadly to LLMOps practices:

**Constraints enable capability**: The most surprising finding is that narrowing the solution space—through rule sets, base templates, and opinionated conventions—makes AI agents more effective, not less. General-purpose automation fails; specific, well-guided automation succeeds.

**Incremental adoption reduces risk**: You cannot design the whole system and flip it on. Introduce one piece at a time, run it manually until you trust it, iterate based on feedback, and only then automate. This builds institutional trust and catches problems before they multiply.

**Existing discipline is prerequisite**: Twin Sun's success rests on years of established practices around testing, code review, and architectural consistency. Organizations without that foundation should build it before attempting automation.

**AI as junior developer is the right mental model**: Treating AI agents as interns or junior developers who need appropriate supervision, clear instructions, and good examples sets realistic expectations and guides effective system design.

**Team composition influences adoption**: Hiring for adaptability and outcome focus rather than attachment to specific technical practices correlates with smoother AI adoption.

**Visual and design work lag functional capabilities**: While code generation and functional testing work well, visual design review and aesthetic judgment remain challenging. Expect to invest more effort here or maintain more human oversight.

**Integration with existing tools beats replacement**: Rather than creating new workflows, integrating AI into existing toolchains—Jira for task management, GitHub for version control, existing CI/CD pipelines—reduces friction and maintains continuity.

**The feedback loop is crucial**: Automated testing, code review, and error reporting that feeds back to agents enables self-correction and iteration without human intervention. This loop is essential to dark factory operation.

**Meta-programming emerges as core skill**: As automation handles more direct coding, the value shifts to programming the system that programs—designing workflows, crafting rule sets, curating examples, and managing the factory itself.
