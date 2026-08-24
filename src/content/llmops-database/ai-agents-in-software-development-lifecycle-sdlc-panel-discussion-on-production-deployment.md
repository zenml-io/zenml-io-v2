---
title: "AI Agents in Software Development Lifecycle (SDLC) - Panel Discussion on Production Deployment"
slug: "ai-agents-in-software-development-lifecycle-sdlc-panel-discussion-on-production-deployment"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "chatbot"
  - "high-stakes-application"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "cost-optimization"
  - "latency-optimization"
  - "human-in-the-loop"
  - "evals"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "monitoring"
  - "crewai"
  - "anthropic"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Overcut / Hud"
summary: "This panel discussion features representatives from Overcut and Hud discussing the practical implementation of AI agents throughout the software development lifecycle. The conversation addresses key challenges in deploying LLMs in production environments, including governance, quality assurance, context management, and cost optimization. Panelists share their experiences with code review automation, test generation, and agent orchestration, emphasizing the need for structured workflows that combine deterministic and agentic approaches. They discuss strategies for building trust in AI systems through gradual adoption, proper observability, and maintaining human oversight at critical junctures while allowing agents to handle lower-risk tasks autonomously."
link: "https://www.youtube.com/watch?v=25ecbeP5KR4"
year: 2026
seo:
  title: "Overcut / Hud: AI Agents in Software Development Lifecycle (SDLC) - Panel Discussion on Production Deployment - ZenML LLMOps Database"
  description: "This panel discussion features representatives from Overcut and Hud discussing the practical implementation of AI agents throughout the software development lifecycle. The conversation addresses key challenges in deploying LLMs in production environments, including governance, quality assurance, context management, and cost optimization. Panelists share their experiences with code review automation, test generation, and agent orchestration, emphasizing the need for structured workflows that combine deterministic and agentic approaches. They discuss strategies for building trust in AI systems through gradual adoption, proper observability, and maintaining human oversight at critical junctures while allowing agents to handle lower-risk tasks autonomously."
  canonical: "https://www.zenml.io/llmops-database/ai-agents-in-software-development-lifecycle-sdlc-panel-discussion-on-production-deployment"
  ogTitle: "Overcut / Hud: AI Agents in Software Development Lifecycle (SDLC) - Panel Discussion on Production Deployment - ZenML LLMOps Database"
  ogDescription: "This panel discussion features representatives from Overcut and Hud discussing the practical implementation of AI agents throughout the software development lifecycle. The conversation addresses key challenges in deploying LLMs in production environments, including governance, quality assurance, context management, and cost optimization. Panelists share their experiences with code review automation, test generation, and agent orchestration, emphasizing the need for structured workflows that combine deterministic and agentic approaches. They discuss strategies for building trust in AI systems through gradual adoption, proper observability, and maintaining human oversight at critical junctures while allowing agents to handle lower-risk tasks autonomously."
notion:
  pageId: "3c6f8dff-2538-807e-af18-c250d9966299"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T08:58:00.000Z"
  lastEditedTime: "2026-08-24T08:58:00.000Z"
  publishedAt: "2026-08-24T09:19:01Z"
---

## Overview

This panel discussion provides insights from two companies working on AI agent platforms for software development: Overcut, a platform for running AI processes and workflows, and Hud, which develops runtime code sensors to help organizations ship more securely with AI. The panelists are Raz, co-founder and CTO of Overcut with over 10 years at Microsoft and 7+ years in AI-based products, and Inbal, a forward deployed engineer and developer at Hud. The discussion focuses on practical challenges and solutions for deploying LLM-based agents in production software development environments.

## Governance and Agent Scope Management

The conversation opens with a fundamental question about governance: how to maintain control over AI agents that are generating code, running tests, and potentially making autonomous decisions. Inbal emphasizes the importance of limiting agent permissions and scope, advocating for specialized agents that focus on narrow domains where they can develop expertise. This stands in contrast to the trend of giving tools like Claude expanding permissions that accumulate over time and become increasingly risky.

For agents running in the background at the organizational level, the panelists stress the need for precise scoping and careful configuration. A key technique discussed is requiring agents to provide citations and supporting evidence for every action they take. This approach serves dual purposes: it significantly reduces hallucinations and improves output quality, while also creating a comprehensive trace of all decisions made. This traceability becomes essential when agents run in backend systems, as it enables developers to debug issues by examining the complete decision chain and understanding where errors occurred in the agent's reasoning process.

## Trust, Testing, and Verification

A significant portion of the discussion addresses the challenge of ensuring that AI-generated tests are meaningful rather than superficial. When agents are asked to both implement features and test them, there's a risk of circular validation where agents create tests that simply confirm their own assumptions without providing genuine quality assurance.

The panelists propose several approaches to this problem. One strategy involves separating the planning of test cases from their execution, explicitly defining expected test scenarios upfront and then validating that the agent actually executed those specific tests rather than creating its own convenient alternatives. This provides a clearer "definition of done" for the agent's work.

Inbal offers a more fundamental critique of traditional testing approaches, noting that tests typically validate functionality based on implementation rather than on actual production behavior. She advocates for asking different questions: what information does the agent actually need to work with, and how does code behave in real production environments? Rather than focusing solely on code coverage metrics, organizations should examine whether there's a correlation between test coverage and what actually matters in production - such as authentication flows, payment processing, or other business-critical paths.

The discussion emphasizes the importance of learning from production over time. Tests should incorporate real data about how customers use the product rather than relying purely on the imagination of the agent or developer who wrote the feature. However, the panelists acknowledge that testing always represents an attempt to predict reality rather than capture it perfectly. Organizations will always lag behind actual production issues, making it essential to complement testing with rapid detection capabilities. The ability to quickly identify when something has gone wrong in production becomes more valuable than attempting to achieve perfect test coverage, which is both extremely expensive and practically impossible.

## Development Environment and Context

The conversation highlights an often-overlooked aspect of enabling agents to create meaningful tests: providing them with appropriate development environments. When developers work locally, they know how to set up their environment with all necessary services, staging databases, and dependencies. However, agents frequently don't have access to these environments, leading to superficial static code analysis rather than genuine integration testing.

The panelists stress that giving agents remote environments where they can actually run code with all supporting services represents a critical enabler for quality automation. This parallels what developers ideally want for themselves - complete, realistic testing environments rather than isolated code review.

## Workflow Orchestration: Deterministic vs. Agentic

A key architectural question discussed is when to use deterministic workflows versus agentic workflows, and how to combine them effectively. Inbal explains that the goal should be to identify the smallest possible units of work with clear beginnings, middles, and ends. Almost every workflow has room for both deterministic automation and agentic decision-making.

Overcut's approach provides a concrete example: they developed separate agents for code generation and code review, but needed something to connect them since both work on the same ticket, bug, or feature. This led to a meta-agent that orchestrates between different specialized workflows. The code generator is agentic, the code reviewer is agentic, but connecting them also requires an agent that understands the original ticket and can navigate between different work processes. This creates a full closed loop from production issue reporting through ticket creation to code generation, review, and deployment.

This multi-layered approach reflects a sophisticated understanding that agentic systems shouldn't be monolithic. Instead, they should be composed of specialized components orchestrated by higher-level agents that manage workflow transitions and maintain context across the entire software development lifecycle.

## Context Management Across SDLC

Context management emerges as perhaps the most critical technical challenge when running agents across the full SDLC. As one audience member asks, how do you maintain continuity from the ideation phase through implementation, testing, and deployment? The conversation moves from summarizing meetings (perhaps in Slack) through code generation and review to final deployment, requiring a consistent thread of context.

Overcut's solution involves an automated process that runs retrospectives on workflows that have already executed. For example, after running a code review that generates comments, the system examines which comments were accepted and which were rejected, creating a memory layer that captures what worked and what didn't. This enables continuous improvement where each workflow execution runs with knowledge of previous iterations, allowing the system to refine its skills and instructions to become more accurate over time.

This represents a form of automated self-improvement where the agent learns from its own performance history. However, this capability also introduces the risk of drift - the possibility that agents might gradually become worse rather than better over time as they optimize based on incomplete or biased feedback.

## Preventing Agent Drift and Evaluation Challenges

The question of drift and evaluation proves particularly thorny. Raz acknowledges that evaluation remains the biggest challenge in the field, especially for those coming from traditional DevOps backgrounds rather than ML/NLP experience. Even fundamental comparisons like whether Claude Opus is better than GPT-5.6 lack clear objective measures - it's largely based on subjective feeling.

However, organizations can still make informed decisions based on practical constraints. Understanding model tiers (Model A versus Model B, their relative costs, and their capabilities) allows for appropriate task allocation. But beyond basic cost-performance tradeoffs, truly robust evaluation remains elusive.

Inbal proposes a different mental model focused on business objectives rather than pure technical metrics. Companies have specific KPIs and SLAs they must meet with customers. There's an objective function - perhaps ensuring payment transactions complete in under half a second - that must not be forgotten amid the excitement of experimentation. Organizations can detect drift by monitoring whether costs increase due to hallucinations, whether SLAs are maintained, and whether core business metrics remain stable over time.

The key insight is measuring against the task itself rather than attempting to evaluate the AI in isolation. Production metrics provide ground truth about whether the system is functioning correctly, even if evaluating the AI's internal reasoning remains difficult.

## Code Review Automation and Blast Radius

Code review emerges as the most popular initial use case for SDLC automation, yet it also presents unique challenges around quality control. The panelists discuss a seemingly paradoxical situation: code review is the first adopted use case, yet it's also where developers traditionally enforce quality standards most rigorously. How do we reconcile automating this critical checkpoint while maintaining quality?

The solution involves thinking architecturally about risk stratification. Not all code changes carry equal risk. Organizations should identify pull requests that don't touch critical code paths, are easy to verify, or only affect internal back-office systems without customer impact. These lower-risk changes can proceed with automated review and even automated merging, while changes affecting payments, authentication, or other sensitive areas still receive human review from tech leads.

Inbal emphasizes examining the production blast radius of code changes. If certain functions have low production impact or would be immediately obvious if broken, they're candidates for fully automated workflows. Where code touches critical systems with complex dependencies, human oversight remains essential, but those humans should be equipped with comprehensive tooling and evidence to make informed decisions efficiently.

This graduated approach builds trust incrementally. Rather than attempting to automate everything at once, organizations should identify low-risk opportunities for automation while maintaining human accountability for critical systems. The panelists note that proper observability becomes essential - even when automation handles the entire workflow, there must be comprehensive visibility into all decisions made and actions taken.

## Model Selection and Cost Optimization

The discussion addresses the practical challenge of selecting appropriate models for different tasks while managing costs. While some San Francisco startups reportedly spend more on tokens than on employees, this isn't yet a widespread concern, particularly outside the US. Nevertheless, cost optimization matters as agent usage scales.

Several strategies emerge for managing costs. Open source models accessed through services like OpenRouter or Amazon Bedrock can significantly reduce expenses. Some platforms have introduced routers that dynamically select appropriate models for specific tasks, though the panelists express some skepticism about whether routing alone represents the best approach to cost optimization.

In practice, organizations are adopting a phased approach: using larger, more capable models for planning stages, then switching to smaller, faster models for execution. This isn't purely about cost - it's also about user experience. When models are too slow, developers lose context and disengage from the workflow. The scarcest resource isn't computational cost but human attention, and maintaining engagement requires responsive systems.

Crucially, Inbal observes that in most organizations she works with, the primary issue isn't model selection but architecture - specifically, what information gets provided to the agent and what guardrails constrain its responses. Problems typically stem from either over-populating context (causing the agent to lose focus and return overly verbose results) or insufficient data precision (forcing the agent to make repeated refinement attempts). Common issues include missing SQL query capabilities or outdated process documentation, which impact costs far more significantly than model choice over time.

## Production Context and Runtime Information

Hud's specific focus on runtime code sensors provides unique insights into context quality. Rather than connecting agents to vast, noisy logs and traces where signal-to-noise ratios remain extremely low, the key is filtering for actionable information. Most logs are depressingly uninformative - perhaps only one or two lines in an entire stack trace actually matter.

Organizations must ask two critical questions: First, is the information in a language the agent can understand? For example, minified production code differs significantly from source code, requiring translation capabilities. Second, what information will be most relevant to the agent's current task? If working on a specific function, the agent needs to know how that function behaves in production - who calls it, whether it contains dead code, which business flows it participates in - not information about the entire codebase.

This precision-over-volume approach emphasizes connecting production runtime behavior directly to specific code elements. Rather than drowning agents in comprehensive but low-value data, organizations should provide targeted, high-value context about how specific code paths actually execute in production. This might include correlating test coverage with actual business-critical flows, understanding authentication patterns, or tracking payment processing behavior.

The approach also involves building organizational context through custom documentation. Tools like automated repository documentation can extract relationship information between functions and entities, providing agents with navigation capabilities similar to how developers use IDE features like "jump to definition." This architectural understanding helps agents comprehend code structure without requiring them to parse entire codebases.

## Balancing Automation and Human Oversight

Throughout the discussion, a consistent theme emerges: the transition to AI-assisted development isn't about replacing humans but about changing their role. Engineers should evolve into higher-level architects who focus on what matters most, using AI agents as team members rather than replacements.

This requires a fundamental shift in mindset. Agents won't perform brilliantly on their first attempt - they need training, refinement, and organizational context just like human employees. Organizations that invest in iterative improvement cycles, building proper SDLC processes with appropriate business logic embedded, will see agents become increasingly valuable over time.

The panelists emphasize maintaining humans "in the loop" during early stages to build trust and confidence in the system. However, this doesn't mean manual approval for every action. Instead, it means strategic oversight at critical junctures while allowing automation to handle appropriate tasks. The goal is finding the right balance: automating where safe while preserving human judgment where it matters most.

Observability underpins this entire approach. Even fully automated workflows must provide comprehensive visibility into actions and decisions. Organizations need organized, well-structured SDLC processes that incorporate relevant business logic and can operate at scale. While currently running perhaps one or two automated workflows, companies should prepare for dramatically increased scale in the near future, requiring robust infrastructure to support potentially hundreds or thousands of concurrent agent executions.

## Future Outlook and Maturity

The panelists acknowledge that the field remains in its early stages. Adoption is still limited, cost isn't yet the primary constraint for most organizations, and fundamental challenges around evaluation and trust persist. Open source models are rapidly catching up to proprietary alternatives, making them increasingly viable options worth exploring.

The discussion reveals a pragmatic, experience-driven perspective on LLMOps that balances enthusiasm for AI capabilities with realistic assessment of current limitations. Both companies represented - Overcut with its workflow orchestration platform and Hud with its runtime security sensors - are actively working to solve practical problems that organizations face when deploying AI agents in production software development environments.

The conversation suggests that successful LLMOps for SDLC automation requires sophisticated thinking about architecture, context management, risk stratification, and gradual trust-building rather than attempting wholesale replacement of human processes. Organizations that thoughtfully design their agent systems with proper governance, observability, and human oversight at appropriate checkpoints will be best positioned to benefit from this technology as it continues maturing.
