---
title: "Building and Operating Claude Code with AI Agents at Scale"
slug: "building-and-operating-claude-code-with-ai-agents-at-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "poc"
  - "content-moderation"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "system-prompts"
  - "evals"
  - "human-in-the-loop"
  - "error-handling"
  - "token-optimization"
  - "memory"
  - "docker"
  - "monitoring"
  - "cicd"
  - "devops"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "fastapi"
  - "anthropic"
industryTags: "tech"
company: "Anthropic"
summary: "Anthropic's product and engineering teams describe their internal use of Claude Code and Claude Tag AI coding agents to build and ship production software at unprecedented speed. The teams leverage aggressive dogfooding, automated code review through AI classifiers, extensive evaluation suites, and security features like auto mode to safely delegate substantial portions of their software development workflow to AI agents. Claude Tag currently lands 65% of product PRs at Anthropic, representing a fundamental shift in how engineering teams operate. The approach emphasizes reduced system prompt constraints, multi-agent collaboration through Slack integration, sophisticated permission management, and continuous evaluation to maintain quality while dramatically accelerating development velocity."
link: "https://www.youtube.com/watch?v=uU5Gv2h8-9g"
year: 2026
seo:
  title: "Anthropic: Building and Operating Claude Code with AI Agents at Scale - ZenML LLMOps Database"
  description: "Anthropic's product and engineering teams describe their internal use of Claude Code and Claude Tag AI coding agents to build and ship production software at unprecedented speed. The teams leverage aggressive dogfooding, automated code review through AI classifiers, extensive evaluation suites, and security features like auto mode to safely delegate substantial portions of their software development workflow to AI agents. Claude Tag currently lands 65% of product PRs at Anthropic, representing a fundamental shift in how engineering teams operate. The approach emphasizes reduced system prompt constraints, multi-agent collaboration through Slack integration, sophisticated permission management, and continuous evaluation to maintain quality while dramatically accelerating development velocity."
  canonical: "https://www.zenml.io/llmops-database/building-and-operating-claude-code-with-ai-agents-at-scale"
  ogTitle: "Anthropic: Building and Operating Claude Code with AI Agents at Scale - ZenML LLMOps Database"
  ogDescription: "Anthropic's product and engineering teams describe their internal use of Claude Code and Claude Tag AI coding agents to build and ship production software at unprecedented speed. The teams leverage aggressive dogfooding, automated code review through AI classifiers, extensive evaluation suites, and security features like auto mode to safely delegate substantial portions of their software development workflow to AI agents. Claude Tag currently lands 65% of product PRs at Anthropic, representing a fundamental shift in how engineering teams operate. The approach emphasizes reduced system prompt constraints, multi-agent collaboration through Slack integration, sophisticated permission management, and continuous evaluation to maintain quality while dramatically accelerating development velocity."
notion:
  pageId: "3a5f8dff-2538-805a-92cf-c2899de26737"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:25:00.000Z"
  lastEditedTime: "2026-07-22T07:25:00.000Z"
  publishedAt: "2026-07-22T07:41:02Z"
---

## Overview

This case study examines how Anthropic internally uses its own AI coding agents, Claude Code and Claude Tag, to build and ship production software. The discussion features perspectives from Anthropic team members Tariq and Cat, who share detailed insights into how their engineering workflow has fundamentally transformed over the past 18 months since Claude Code launched in February of the previous year as part of the Claude Sonnet 3.7 release.

The case represents a compelling example of recursive improvement, where AI tools are used to build better versions of themselves, and where the company's own engineering team serves as the primary testing ground for new capabilities before public release. Anthropic's approach emphasizes aggressive internal dogfooding, sophisticated evaluation infrastructure, and a cultural shift toward higher ambition and faster iteration cycles.

## Evolution of Engineering Workflow

The transformation in how Anthropic's engineers work has been dramatic. In the early days of Claude Code with Sonnet 3.7, engineers had to closely monitor every action the agent took, carefully reading permission prompts and frequently intervening to check files and verify work. The workflow required constant human supervision and careful oversight of each step.

With subsequent model generations, particularly Opus 4.8 and the recent Fable release, engineers have been able to step back and delegate increasingly complex implementation work to the agents. The current state enables one-shot feature completion for many use cases with Fable, where engineers can provide a specification and the agent completes the entire implementation without iterative guidance. This has freed engineering time to focus on higher-level creative work, product experience design, and strategic technical decisions rather than implementation details.

The team notes a critical shift in required engineering skills. Where product development previously followed a six-to-twelve-month cycle involving extensive cross-functional alignment and detailed specifications before writing code, the timeline has compressed to potentially a week or less. This acceleration places greater emphasis on product taste, business sense, and judgment about what should be built, while reducing the relative value of pure execution capability. Engineers now need stronger intuition about which features will meaningfully impact the business, since the barrier to building has dropped so significantly.

## System Prompt Evolution and Optimization

One of the most technically interesting aspects of the case study involves the dramatic reduction in system prompt length as models have improved. With the release of Fable and Opus 4.8, Anthropic reduced the Claude Code system prompt by 80% compared to earlier versions. This reduction reflects fundamental improvements in model capabilities and changes in prompting best practices.

The team found that earlier models benefited from extensive examples and explicit constraints, but more capable models actually perform better with fewer examples and more general guidance. Providing too many specific examples was constraining model creativity and preventing it from finding better solutions than the examples demonstrated. The shift represents a move from detailed instruction-following to leveraging model judgment and general capability.

Another key finding was that hard constraints in system prompts create problems when they conflict with user instructions or don't account for edge cases. The team moved away from absolute statements like "always verify" toward more contextual guidance that acknowledges nuance. For example, rather than mandating verification for all front-end changes, the revised prompt explains that front-end changes often require running the app locally to understand the full user experience, leaving the model to exercise judgment about when verification is truly necessary.

This approach only works with frontier models that possess sufficient judgment and taste to make appropriate decisions. Anthropic now maintains different system prompts for different models, with older models still receiving the longer, more prescriptive prompts while Fable and Opus operate with the lean 80% reduced versions. The models themselves have become capable enough to prompt other models effectively, including understanding when to provide more detailed instructions to less capable models.

## Tool Design Philosophy

Claude Code operates fundamentally as a collection of tools that the agent can invoke to accomplish development tasks. The team's philosophy on tool design has evolved toward maintaining low cardinality with distinct functions for each tool, ensuring Claude can easily distinguish when to use each one.

The team has trended toward fewer, more general tools rather than proliferating specialized ones. Recent additions include the task tool and workflow capabilities, but many specialized tools have been removed in favor of teaching Claude to use standard command-line tools. For example, dedicated grep and glob search tools were removed in favor of having Claude use native bash commands.

The file editing tool provides an interesting case study in tool design. While Claude could theoretically accomplish file editing through sed and other standard tools, Anthropic maintains a dedicated file edit tool primarily to support clean UI rendering of proposed changes. This allows the interface to show users a clear view of what Claude intends to change in each file, creating natural approval checkpoints. The team acknowledges that for experienced users running in auto mode, the dedicated tool may no longer be necessary and could potentially be removed.

The ask user question tool represents one of the most impactful tool additions, allowing Claude to request clarification or additional information when needed. Tool evaluation remains challenging, particularly for tools involving user interaction where behavior depends heavily on context and user preferences. The team relies extensively on internal dogfooding to validate tool effectiveness, though this approach has evolved to include more formal evaluation as the product has matured.

## Claude Tag and Multiplayer Collaboration

Claude Tag represents Anthropic's evolution of Claude Code into a team collaboration environment, launching within Slack to enable multiplayer AI-assisted development. The tool differs from Claude Code in three key ways: it's multiplayer by default with team members able to collaborate on the same PR through Slack threads, it operates proactively rather than reactively by monitoring channels and automatically responding to specified conditions, and it includes team memory that persists preferences across all team members.

The proactive capabilities enable workflows where Claude Tag monitors a bug report channel continuously, automatically creates PRs to address issues, and tags the appropriate engineer who last modified the relevant code. This automation removes the manual overhead of triaging and assigning work while maintaining human oversight at critical decision points.

For Anthropic's internal product engineering team, Claude Tag currently lands 65% of product PRs, representing more than half of all code changes reaching production. This level of automation reflects both the tool's capability and the team's trust in its output quality. The split between Claude Code and Claude Tag usage follows a pattern where Claude Code handles complex interactive tasks requiring iteration, while Claude Tag manages proactive background work and routine responses to issues and requests.

Beyond coding, teams use Claude Tag as a company knowledge search engine, querying across Slack history to find information and context. Marketing teams use it to understand features without programming knowledge, as Claude can clone repositories and analyze functionality to produce documentation and recordings. The tool serves as a bridge between technical and non-technical team members, democratizing access to codebase knowledge.

The multiplayer sessions enable fluid collaboration where a designer might initiate a change request, Claude Tag makes a first pass implementation, the designer provides feedback and tags an engineer to refine it, and the engineer finalizes it for production. This workflow compresses what previously required multiple handoffs and meetings into a single threaded conversation.

## Evaluation Infrastructure

Anthropic has invested heavily in evaluation infrastructure to maintain quality and safety as they've automated more of the development workflow. The evaluation strategy combines external benchmarks that they trust with larger suites of internal evaluations developed specifically for Claude Code capabilities and use cases.

The eval development process is tightly coupled to incident review. When a PR causes an issue in production, the team updates the code review agent to catch that class of problem, then adds the problematic PR to an evaluation set to ensure future changes to the code review system never regress on that metric. This creates a continuously improving safety net that learns from each failure.

For capability evaluation, the team starts by measuring whether Claude can complete well-defined tasks with full codebase context, focusing on correctness and test passing rates. But they've extended evaluation beyond pure capability to cover behavioral aspects that impact user experience. For example, users strongly dislike when Claude suggests stopping work midway through a multi-step task, or when it asks permission to continue rather than completing what was requested. The team builds specific behavioral evals to catch these issues and ensures they don't regress.

New model releases trigger comprehensive eval runs across the entire test suite. This allows drop-in replacement of models with confidence that the new version is strictly better than the previous one. The team specifically verifies that Fable performs better than Opus 4.8 across all critical dimensions before deployment, ensuring that model updates represent clear improvements rather than tradeoffs.

When making system prompt changes, the team uses the eval suite to ensure no regression in performance even as they simplify and reduce prompt length. This disciplined approach allows them to confidently remove instructions and constraints that earlier seemed necessary but actually limited model effectiveness.

The evaluation coverage is not complete, and the team acknowledges they prioritize building evals for the highest-impact issues based on user feedback. They explicitly encourage users to be vocal about problems, as user feedback directly drives eval development priorities. This user-driven approach ensures evaluation efforts focus on real-world pain points rather than theoretical concerns.

## Security and Safety with Auto Mode

Auto mode represents Anthropic's solution to safe autonomous operation of coding agents, addressing the fundamental tension between allowing agents to work independently and protecting against malicious actions. The feature has been in internal use at Anthropic since January, undergoing months of hardening before wider release.

The security approach uses a Sonnet classifier that evaluates each tool call and bash command in the context of both the conversation history and user instructions. This dynamic analysis enables context-aware permission decisions. For example, git push permissions are granted when the user explicitly requests pushing code to GitHub but denied otherwise. Similarly, if a user instructs "don't push," auto mode will block push attempts even when they might seem reasonable.

Auto mode integrates deeply with sandboxing infrastructure to manage edge cases that are difficult to handle deterministically. When sandboxed operations need to escape the sandbox, such as making network requests, auto mode evaluates each request individually to determine if it's appropriate given the context. This provides much more nuanced control than simple allow/deny rules could achieve.

The team has conducted extensive red team testing, commissioning multiple external security researchers to create adversarial environments with prompt injection attempts, malicious inputs, and other attack vectors. They claim to have mitigated every identified issue, though they acknowledge no system can catch 100% of potential problems. The published claim is that for major risk categories including prompt injection and data exfiltration, auto mode's risk level is lower than average human code reviewers.

This security infrastructure directly enables Claude Tag's functionality, as Claude Tag must operate safely while being influenced by anyone who can interact with it in Slack channels. The potential attack surface is much larger than Claude Code since any team member could potentially inject malicious instructions. The defense-in-depth approach includes not just auto mode but also reinforcement learning against adversarial inputs and careful identity management.

For credential security, Anthropic supports credential injection patterns where sensitive tokens are proxied rather than directly accessible to the agent. When Claude attempts to call an API like Datadog, the system intercepts the request and injects the real credential without allowing the agent itself to access or read the token value. This prevents credential leakage even if the agent is compromised.

The team has also implemented trusted device support for remote control scenarios, where users connect mobile devices to local Claude Code sessions. This adds another layer of authentication and access control for remote access patterns.

## Code Review and Quality Assurance

Anthropic's approach to code review has evolved to incorporate AI at multiple levels while maintaining human oversight for critical paths. For the most important core systems like Claude Code itself and system prompt changes, designated code owners must manually review all changes. These code owners are directly responsible for code quality in their area and their approval is required for merges.

For less critical changes affecting outer layers of the system, Claude Code itself performs the review through an automated code review agent. This represents a significant trust threshold that the team reached through months of gradual validation. The process involved identifying categories of changes where the automated reviewer caught 100% of issues, then removing the human review requirement for those categories.

The team maintains separate evaluation for code review effectiveness, measuring whether the automated reviewer catches the issues they care about. When incidents occur, they analyze the causal PR and update the code review agent to catch similar issues in the future, then add the incident PR to the review eval set. This creates a ratchet effect where code review capability only improves over time and never regresses.

The confidence to remove humans from code review loops came from sustained evidence that automated review was as effective or better than human review for specific change categories. This transition happened in baby steps rather than all at once, with each step requiring evidence of 100% catch rate before expanding automated review to new areas.

Different models receive different levels of trust. The extensive evaluation ensures that new frontier models like Fable can serve as drop-in replacements for previous models, but older models continue to receive more prescriptive system prompts and tighter oversight. This tiered approach optimizes for capability where it exists while maintaining safety across the model spectrum.

## Cultural and Organizational Factors

Several aspects of Anthropic's company culture emerge as key enablers of their LLMOps success. The most prominent is aggressive dogfooding, where every new feature is used extensively by Anthropic employees before external release. The team has explicit internal metrics for active users and retention that features must achieve before shipping to customers. This creates a clear bar that every engineer understands and optimizes toward.

The dogfooding culture also drives rapid iteration based on direct experience rather than hypothetical user needs. When engineers encounter limitations or issues in their daily work, they fix the product rather than finding workarounds. This ensures the product solves real problems that the team themselves experiences.

The company operates with a high degree of transparency through public Slack channels. Claude Tag works best when most channels are public, as it can search across all public channels to gather context for more accurate responses. This architectural requirement reinforces cultural openness and information sharing.

A key cultural value is captured in the phrase "we don't negotiate against ourselves." This means the team avoids talking themselves out of ambitious goals by imagining tradeoffs that may not be real. Instead, they push forward with ambitious plans and let real constraints reveal themselves through implementation rather than theoretical analysis. This bias toward action and high ambition appears repeatedly in how they approach product development.

The organization accepts that different model versions have different capabilities and maintains separate configurations for different models rather than trying to find one-size-fits-all solutions. This pragmatism allows them to optimize for each model's strengths while providing consistent user experiences.

## Prioritization and Product Development

With feature development becoming dramatically cheaper and faster, prioritization has become more challenging and more critical. Anthropic's approach combines several strategies to decide what to build.

The internal dogfooding provides direct signal about what features matter. Combined with the retention and active user metrics, this creates quantitative feedback about whether features add real value. Features that don't achieve the internal bar simply aren't shipped externally, regardless of how much effort went into building them.

The team emphasizes developing product taste and business sense among all engineers, not just product managers. Since the timeline from idea to implementation has compressed so dramatically, everyone needs better intuition about what will actually move business metrics. The role of product managers has shifted from writing detailed specifications to filling gaps across design, engineering, and communication.

Surprisingly, the team advocates for rewrites as now being a reasonable strategy where they previously followed conventional wisdom against rewrites. With strong test suites, rewrites can be accomplished quickly and force teams to ensure comprehensive test coverage. The existing codebase serves as a specification that can be used to generate alternative implementations, which can then be compared for quality and performance.

The product development cycle has fundamentally inverted from the traditional model. Rather than spending six months aligning cross-functional teams on detailed specifications before writing code, teams now prototype implementations quickly and use those prototypes to inform product decisions. This empirical approach replaces theoretical planning with concrete artifacts that can be evaluated and refined.

## Limitations and Ongoing Challenges

Despite remarkable progress, significant limitations remain. Design taste and UX polish continue to lag human capabilities. While Claude can implement specified features accurately, the aesthetic and interaction design often feels generic or derivative of existing patterns. The team hopes future models will serve as better interaction design thought partners rather than just implementation engines.

There's a recognizable "Opus aesthetic" to AI-generated interfaces that makes them identifiable and sometimes unsatisfying. For frontier AI products especially, the team sees opportunity for novel interaction patterns that haven't yet been designed, and current models don't excel at this creative design work.

Understanding and trusting new models remains a challenge. When a new model releases, teams must quickly build intuition about its capabilities and failure modes. While comprehensive evaluation helps verify that new models are strictly better overall, individual users still need to calibrate their mental models of what the new model can reliably do.

The 80% system prompt reduction works for frontier models but breaks down for less capable models, requiring maintenance of multiple prompt versions. This creates additional complexity in the system and makes some optimizations model-specific rather than universal.

Tool design remains more art than science, despite extensive evaluation infrastructure. Particularly for tools involving user interaction and context-dependent behavior, it's difficult to formally verify effectiveness. The team continues to rely heavily on experiential learning and intuition.

## Practical Applications and Examples

Beyond building Claude Code itself, team members use the tools for diverse personal projects. One engineer built a 2D Street Fighter style fighting game, using Claude Code to prompt image generation models and verify animation frames. Claude proved excellent at prompting other models, determining whether animations were good, and even generating hitbox JSON for character sprites.

Another team member built a custom rock climbing trip planning application that uses workflows to research destinations, check flight availability, query climbing route databases, filter by difficulty level, and even optimize for short approach distances from parking to climbing areas. This demonstrates how workflows excel at research-heavy tasks beyond coding, including travel planning and venue finding.

For video editing, Claude Fable demonstrated sophisticated capability by taking raw conference presentation files including stage video, deck video, and audio, then automatically transcribing, cropping to track the speaker's movement, choosing between video deck capture and HTML source based on quality, and adding graphics and animations. This represented a one-shot success with a good prompt, highlighting how the capability frontier continues to advance.

The team uses Claude Tag internally for everything from searching company knowledge in Slack to querying metrics from event stores to generating feature documentation with recordings. Marketing teams without programming knowledge can ask Claude Tag about features and receive comprehensive explanations including code analysis and usage demonstrations.

## Conclusion and Future Directions

The Anthropic case study demonstrates that aggressive internal adoption of AI coding agents can fundamentally transform software development workflows when supported by rigorous evaluation, sophisticated security controls, and cultural alignment. The 65% PR automation rate for product engineering represents a genuine inflection point in how software gets built.

The key technical innovations include the 80% reduction in system prompt length through relying on model judgment, the auto mode security classifier for safe autonomous operation, the integration of code review directly into the development cycle through AI agents, and the multiplayer collaboration model enabling both technical and non-technical team members to participate in development.

Critical success factors include months of internal hardening before external release, comprehensive evaluation suites that grow continuously from real incidents, the willingness to maintain model-specific configurations rather than seeking universal solutions, transparent culture enabling AI access to broad company knowledge, and explicit internal quality bars that features must achieve before shipping.

The limitations around design taste, the need for model-specific system prompts, and the ongoing challenge of building intuition about new model capabilities suggest that further advancement is needed before AI agents can fully match human capability across all dimensions of software development. However, the current state already enables dramatic productivity improvements when properly implemented and safeguarded.
