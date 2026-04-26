---
title: "Agentic Code Reviewers as System Protectors"
slug: "agentic-code-reviewers-as-system-protectors"
draft: false
llmopsTags:
  - "code-generation"
  - "fraud-detection"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "system-prompts"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "devops"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
industryTags: "finance"
company: "Block"
summary: "Block faced the challenge of maintaining system resilience at scale as engineering teams shipped locally rational but globally corrosive features that eroded overall architecture. They developed \"Builderbot,\" an agentic code review system that acts as a vigilant guardian rather than a passive assistant, continuously observing, learning, and steering changes to align with their organizational \"world model.\" The solution shifts protection left in the development lifecycle, uses standardized CLI contracts (Just) for local development, implements progressive context disclosure through AGENTS.md files and Code Review Checks, and leverages Agent Skills for dynamic context loading. The result is a protector system that enables velocity with confidence, catching issues pre-push, reducing burden on human reviewers, and ensuring architectural alignment across the entire organization."
link: "https://engineering.block.xyz/blog/protecting-our-systems-with-intelligence"
year: 2026
seo:
  title: "Block: Agentic Code Reviewers as System Protectors - ZenML LLMOps Database"
  description: "Block faced the challenge of maintaining system resilience at scale as engineering teams shipped locally rational but globally corrosive features that eroded overall architecture. They developed \"Builderbot,\" an agentic code review system that acts as a vigilant guardian rather than a passive assistant, continuously observing, learning, and steering changes to align with their organizational \"world model.\" The solution shifts protection left in the development lifecycle, uses standardized CLI contracts (Just) for local development, implements progressive context disclosure through AGENTS.md files and Code Review Checks, and leverages Agent Skills for dynamic context loading. The result is a protector system that enables velocity with confidence, catching issues pre-push, reducing burden on human reviewers, and ensuring architectural alignment across the entire organization."
  canonical: "https://www.zenml.io/llmops-database/agentic-code-reviewers-as-system-protectors"
  ogTitle: "Block: Agentic Code Reviewers as System Protectors - ZenML LLMOps Database"
  ogDescription: "Block faced the challenge of maintaining system resilience at scale as engineering teams shipped locally rational but globally corrosive features that eroded overall architecture. They developed \"Builderbot,\" an agentic code review system that acts as a vigilant guardian rather than a passive assistant, continuously observing, learning, and steering changes to align with their organizational \"world model.\" The solution shifts protection left in the development lifecycle, uses standardized CLI contracts (Just) for local development, implements progressive context disclosure through AGENTS.md files and Code Review Checks, and leverages Agent Skills for dynamic context loading. The result is a protector system that enables velocity with confidence, catching issues pre-push, reducing burden on human reviewers, and ensuring architectural alignment across the entire organization."
notion:
  pageId: "34ef8dff-2538-817d-ae52-c2bfb931d7f7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T10:04:31Z"
---

## Overview

Block's engineering team has developed a sophisticated LLMOps implementation centered around autonomous code review agents that function as system protectors rather than simple assistants. Published in April 2026, this case study describes their approach to using agentic AI systems to maintain architectural integrity and system resilience as their engineering organization scales. The core innovation is "Builderbot," which sits between developers and the systems being built to ensure that individual team changes align with the broader organizational "world model"—a concept representing the company's architectural patterns, security requirements, and operational constraints.

The fundamental problem Block addresses is one familiar to large engineering organizations: individual teams making changes that are locally sensible but globally harmful to overall system architecture. As no single engineer can hold the complete system in their head anymore, Block needed an intelligent system that could evaluate every proposed change against a holistic model of the entire organization's technical ecosystem. Their solution reframes AI agents not as passive advisors presenting options, but as active protectors that continuously monitor, evaluate, and steer development work—analogous to an immune system that acts autonomously rather than waiting for conscious intervention.

## Architectural Approach: Protectors vs Assistants

Block makes a deliberate philosophical distinction in how they position their agentic systems. Rather than building assistants that wait to be asked or advisors that present options and step back, they've architected "protectors" that act continuously and autonomously, often below the threshold of developer awareness. The immune system analogy they employ is instructive: these systems don't wait for problems to be noticed or present dashboards of threats requiring human decision-making. Instead, they operate with sophistication in the background, with humans only becoming aware when the system fails or requires escalation.

Builderbot's code review system embodies this protector philosophy. It evaluates every proposed change against a comprehensive model of the entire system—not merely the specific module being modified, but the broader architectural patterns, security requirements, and operational constraints spanning the organization. The system's default mode is action rather than recommendation. It doesn't generate reports and wait for human response; instead, it reviews, flags issues, and actively steers changes, with humans providing final approval stamps rather than conducting initial analysis.

## Key Technical Principles

### Shift Left Strategy

Block emphasizes that protection against system erosion must occur as early as possible in the software development lifecycle. While "shift left" is an established pattern in software engineering, it becomes critical when scaling feature delivery with intelligent agents. In many organizations, continuous integration (CI) has become the default validation layer—test suites grow large, builds become complex, and it's often easier to let the build system identify problems than to verify everything locally. 

Block's agentic approach changes this equation fundamentally. Their agents can run the same checks locally before code is pushed, at speeds and with consistency that wasn't previously practical for human developers. The key enabler is providing agents with a consistent, standardized entrypoint to development tools. Block has implemented this through a single common CLI contract for local development across all repositories using Just, a command runner tool. This standardization means local agents have predictable entrypoints to the same tools that CI runs—they can reliably execute `just fmt` or `just test` via pre-commit and pre-push hooks before pushing code to pull requests.

This seemingly small architectural decision has massive implications for local agent effectiveness. Instead of agents fumbling around when encountering new repositories, trying to discover how to run tests or apply formatting, they have standard expectations that work consistently across the codebase. This dramatically reduces the burden on CI systems and catches issues earlier in the development cycle when they're cheaper and faster to fix.

### Hyperlocal Context with Global Knowledge

A central insight in Block's implementation is that one-size-fits-all protection is insufficient. Each module needs the ability to define custom hooks, checks, and context specific to its domain, security posture, or operational requirements. It's inadequate to define a single protector and expect it to work effectively for every system, nor to expect monorepo-level rules to adequately cover every module within that repository. Block argues that hyperlocal context working in concert with a global world model is a fundamental requirement for protectors to have sufficient information when steering system changes.

Through iterative experimentation, Block evolved their approach to context management. They observed that many agentic reviewers are limited to a single prompt expected to cover an entire system, but found much greater success leveraging progressive disclosure to guide agentic reviews with context appropriate to specific modules. This progressive disclosure happens through several mechanisms, which they've standardized across their engineering organization.

### Context Management Infrastructure

Block has implemented multiple complementary mechanisms for managing context at different scopes:

**AGENTS.md Files**: This convention provides progressive context disclosure at the module level. Most agents automatically load AGENTS.md files when starting work in a directory and check for additional local AGENTS.md files as they navigate the system. Block frequently includes hints in these files directing agents to external documentation or neighboring systems whose implementations need synchronization. By carefully crafting nested AGENTS.md files throughout a project hierarchy, they can steer agents with precisely the local context needed for success without overwhelming them with irrelevant information.

**Code Review Checks**: While AGENTS.md provides useful module-level context, Block recognizes it's insufficient for capturing their complete world model in an agent-accessible format. A critical observation is that each token added to AGENTS.md creates cognitive burden for every agent encountering that module, regardless of whether the context is relevant to their current task. To address this, Block leverages Amp's Code Review Checks pattern, which moves prompts into `.agents/checks/*.md` files that only load when relevant. Like AGENTS.md, these checks can be nested within individual modules using `**/.agents/checks/*.md` glob patterns. Each prompt executes with its own dedicated review subagent, ensuring signal quality remains high and context is only loaded when needed.

**Agent Skills**: This provides another standardization for pulling context out of critical paths. Agent Skills is described as a highly extensible format for exposing context to agents and allowing them to dynamically equip themselves with relevant information when it becomes pertinent to a specific task. Through an internal Skills Marketplace, Block leverages hundreds of internally-written Agent Skills to seed environments with context that helps stateless agents quickly understand the world model and proactively steer decisions during research, planning, and implementation phases.

The combination of these three mechanisms—AGENTS.md for module-level guidance, Code Review Checks for conditional deep inspection, and Agent Skills for dynamic capability extension—creates a sophisticated context management system that balances comprehensiveness with efficiency.

## Implementation: Building the Protector System

### Single Entrypoint Architecture

To catch issues as early as possible while maintaining consistency between local and cloud environments, Block distributes a unified CLI tool called `sq agents review` to every workstation and cloud agent runner. This tool has complete access to both local and global knowledge sources, ensuring that local agents can perform the same validations as cloud-based CI agents. Having a single entrypoint for system protection across all environments makes policy evolution straightforward—changes to the protection logic propagate uniformly.

When running against a pull request, `sq agents review` verifies alignment with the organizational world model before requesting human reviewers to provide final approval. This architecture fundamentally changes the human role from initial analyst to final approver, dramatically reducing cognitive burden on human engineers while maintaining human oversight at critical decision points.

### Specialized Parallel Reviews

With Code Review Checks, Block equips module owners with the ability to define hyperlocal review context that gets dispatched to specialized subagents during `sq agents review` execution. Each check runs as an isolated subagent with its own dedicated context window. This means a global check for API standards loads entirely different context than a module-level check for PCI compliance in the `payments/` module or security review in the `auth/` module. These subagents execute in parallel, with findings aggregated into a unified review report.

Beyond module-local checks, Block maintains a continuously evolving set of global checks that execute during review time to verify new code adheres to the global world model. This allows them to catch architectural drift and steer agentic changes by codifying organizational concerns. An important architectural advantage: because agentic reviews run on Block's own infrastructure rather than third-party services, they can reference internal documents and proprietary knowledge sources during review time that wouldn't be accessible to external reviewers. This is a significant LLMOps consideration—the ability to keep sensitive context and proprietary knowledge within organizational boundaries while still leveraging AI capabilities.

### Continuous Policy Evolution

Block has implemented a "heartbeat" mechanism enabling their protectors to proactively review incidents, announcements, and internal communications to consider which deterministic and non-deterministic checks should be proposed for human review. This creates a feedback loop where the protection system learns from organizational experience and suggests improvements to its own policies.

These proposed checks can be scoped locally within a particular module or repository experiencing recurring issues, or added globally to steer entire systems toward evolved versions of the world model. This continuous evolution mechanism is critical for LLMOps at scale—it means the protection system can adapt to changing organizational needs, new security threats, emerging architectural patterns, and lessons learned from incidents without requiring manual policy updates for every change.

## LLMOps Considerations and Tradeoffs

### Context Management Complexity

While Block's multi-layered context management approach (AGENTS.md, Code Review Checks, Agent Skills) provides sophisticated control over what information agents see and when, it also introduces significant operational complexity. Engineers must understand when to use each mechanism, how they interact, and how to debug issues when agents don't behave as expected. The progressive disclosure approach requires careful curation—poorly designed AGENTS.md files or overly broad Code Review Checks could still overwhelm agent context windows or create conflicting guidance.

### Standardization Requirements

The "shift left" strategy's effectiveness depends entirely on the Just CLI standardization being maintained across all repositories. This creates an organizational dependency—teams must conform to the standard contract, which may not fit naturally with every technology stack or development workflow. The case study doesn't address how Block handles exceptions or repositories that don't fit the standard pattern, which is a practical concern for large heterogeneous engineering organizations.

### Agent Reliability and Trust

The protector philosophy positions agents as autonomous actors that "act continuously, mostly below the threshold of awareness." This raises important questions about transparency, auditability, and trust that the case study doesn't fully address. When agents are making decisions and steering changes autonomously, how do engineers understand why certain changes were flagged or steered? What happens when the protector makes incorrect decisions? The immune system analogy is evocative but potentially misleading—unlike biological immune systems, code review agents can make mistakes that have immediate business impact.

### Computational Costs

Running parallel subagent reviews with dedicated context windows for each check likely incurs significant computational costs, especially at Block's scale. The case study mentions running on their own hardware, which provides control over proprietary context but also means Block bears the full infrastructure cost. The economic viability of this approach depends on the cost-benefit ratio between infrastructure spending and engineering velocity gains, which isn't quantified in the case study.

### Human-in-the-Loop Balance

While the case study positions humans as providing "final approval stamps," the practical effectiveness of human oversight when agents have done extensive initial analysis is questionable. Research on automation bias suggests humans tend to over-trust automated recommendations, especially when the automation is sophisticated and the domain is complex. Block's approach may create a scenario where human reviewers become rubber-stampers rather than meaningful checks on agent decisions.

## Operational Maturity Indicators

The case study demonstrates several markers of LLMOps maturity:

**Infrastructure Ownership**: Running agents on proprietary infrastructure rather than relying solely on third-party services indicates sophisticated operational capability and recognition of security/privacy requirements for production AI systems.

**Standardized Interfaces**: The Just CLI standardization and `sq agents review` entrypoint show understanding that agent effectiveness requires consistent, predictable interfaces rather than ad-hoc tool access.

**Progressive Context Management**: The multi-layered approach to context (AGENTS.md, Code Review Checks, Agent Skills) demonstrates awareness that naive context management (putting everything in one big prompt) doesn't scale.

**Continuous Learning**: The heartbeat mechanism for policy evolution shows recognition that static rule systems become obsolete quickly—production AI systems need feedback loops for continuous improvement.

**Parallel Execution Architecture**: Running specialized subagents in parallel with aggregated results indicates sophisticated orchestration capabilities and understanding of how to structure agentic workflows for efficiency.

## Evaluation and Measurement Gaps

Notably absent from the case study are concrete metrics demonstrating effectiveness. There's no data on:

- Defect detection rates (how many issues are caught by Builderbot vs. missed)
- False positive rates (how often does the system flag non-issues)
- Time savings for human reviewers (quantified reduction in review burden)
- Impact on deployment velocity (measured change in time-to-production)
- System reliability (agent uptime, error rates, escalation frequency)

The lack of quantitative results is a significant limitation for assessing the actual production value of the system versus the conceptual elegance of the architecture. This is common in vendor or engineering blog content focused on demonstrating technical sophistication rather than proving business value.

## Critical Assessment

Block's approach represents sophisticated thinking about agentic AI systems in production software development. The protector framing is philosophically interesting and the multi-layered context management shows genuine LLMOps maturity. However, the case study is fundamentally a conceptual architecture description rather than a validated case study with demonstrated results.

The reliance on multiple emerging standards (AGENTS.md, Agent Skills, Amp's Code Review Checks) suggests either that Block is at the forefront of emerging best practices or that they're building on unstable foundations. The case study doesn't acknowledge the coordination costs of maintaining these multiple systems or the learning curve for engineers adopting these patterns.

The autonomous protector concept is compelling but potentially oversold. The claim that the system "acts continuously, mostly below the threshold of awareness" with humans only noticing when it fails is concerning from a governance and accountability perspective. Production AI systems should generally be observable and explainable, not invisible until they fail.

Overall, this represents an ambitious and architecturally sophisticated approach to production AI for code review, but should be evaluated as a description of Block's vision and technical direction rather than a proven case study with validated outcomes. Organizations considering similar approaches should focus on incremental implementation with careful measurement of actual impact rather than attempting to replicate the full architecture based on conceptual appeal alone.
