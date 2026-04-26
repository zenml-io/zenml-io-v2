---
title: "Grassroots AI Skills Marketplace: Scaling AI Capabilities Through Bottom-Up Engineering"
slug: "grassroots-ai-skills-marketplace-scaling-ai-capabilities-through-bottom-up-engineering"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "data-analysis"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "cicd"
  - "microservices"
  - "continuous-deployment"
  - "continuous-integration"
  - "devops"
  - "orchestration"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "documentation"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Uber"
summary: "Uber faced the common challenge of scaling AI adoption across a large engineering organization with 200+ microservices and thousands of engineers. Rather than implementing a top-down enterprise AI mandate, Uber enabled organic growth through a grassroots approach where a single engineer created an internal \"Agentic Marketplace\" for Claude AI skills. Starting with just two custom skills in October 2024, the platform grew to over 500 specialized AI skills within five months through engineer-driven demand. The solution featured a two-tier governance model: a curated \"Golden Marketplace\" with strict oversight for mission-critical tools, and an experimental sandbox for rapid innovation. Results included widespread adoption across the engineering organization, automation of code reviews, verification workflows, and the democratization of senior engineering knowledge."
link: "https://medium.com/activated-thinker/how-uber-secretly-scaled-ai-from-2-to-500-skills-in-5-months-without-a-strategy-25ff894c0f9c"
year: 2026
seo:
  title: "Uber: Grassroots AI Skills Marketplace: Scaling AI Capabilities Through Bottom-Up Engineering - ZenML LLMOps Database"
  description: "Uber faced the common challenge of scaling AI adoption across a large engineering organization with 200+ microservices and thousands of engineers. Rather than implementing a top-down enterprise AI mandate, Uber enabled organic growth through a grassroots approach where a single engineer created an internal \"Agentic Marketplace\" for Claude AI skills. Starting with just two custom skills in October 2024, the platform grew to over 500 specialized AI skills within five months through engineer-driven demand. The solution featured a two-tier governance model: a curated \"Golden Marketplace\" with strict oversight for mission-critical tools, and an experimental sandbox for rapid innovation. Results included widespread adoption across the engineering organization, automation of code reviews, verification workflows, and the democratization of senior engineering knowledge."
  canonical: "https://www.zenml.io/llmops-database/grassroots-ai-skills-marketplace-scaling-ai-capabilities-through-bottom-up-engineering"
  ogTitle: "Uber: Grassroots AI Skills Marketplace: Scaling AI Capabilities Through Bottom-Up Engineering - ZenML LLMOps Database"
  ogDescription: "Uber faced the common challenge of scaling AI adoption across a large engineering organization with 200+ microservices and thousands of engineers. Rather than implementing a top-down enterprise AI mandate, Uber enabled organic growth through a grassroots approach where a single engineer created an internal \"Agentic Marketplace\" for Claude AI skills. Starting with just two custom skills in October 2024, the platform grew to over 500 specialized AI skills within five months through engineer-driven demand. The solution featured a two-tier governance model: a curated \"Golden Marketplace\" with strict oversight for mission-critical tools, and an experimental sandbox for rapid innovation. Results included widespread adoption across the engineering organization, automation of code reviews, verification workflows, and the democratization of senior engineering knowledge."
notion:
  pageId: "34ef8dff-2538-81d5-bcb5-e441e975f53d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T10:09:10Z"
---

## Overview

This case study documents Uber's approach to scaling AI adoption across their engineering organization, led by Adam Hooda (Head of AI Foundations & DevX, previously employee #8 at Twitter). The article, published in March 2026 and based on an interview between Anthropic's Claude Code team and Hooda, describes how Uber grew from 2 experimental AI skills to over 500 production-ready capabilities in just five months without formal top-down planning. The case represents a significant departure from traditional enterprise AI transformation approaches, highlighting the power of grassroots, engineer-driven adoption over executive mandates.

Uber operates at substantial scale with 200+ microservices and thousands of globally distributed engineers. The organization's engineering workflow needed to evolve toward what Hooda terms "Agentic Engineering" while maintaining production stability—breaking production for AI experiments simply wasn't viable. The solution emerged not from strategic planning but from organic adoption driven by immediate engineering needs and demonstrable value.

## Growth Timeline and Adoption Pattern

The trajectory of adoption reveals important insights about how AI tooling spreads in engineering organizations when value is clear and barriers are low. In October 2024, a single developer on Uber's platform team built the first internal marketplace with just two tools: a CI log triage and repair skill, and a basic code reviewer. This initial effort required no kickoff meeting, steering committee, or budget approval—management wasn't even aware of its existence.

By December 2024, the marketplace had grown modestly to about 20 skills as a handful of engineers began experimenting. The inflection point came in January 2025 when Hooda and his team experienced what he describes as collective "Aha!" moments while using Claude Code heavily. This wasn't driven by training seminars but by engineers experiencing firsthand how these tools could automate tasks that previously consumed hours. The realization spread organically as engineers discovered they could complete work significantly faster within their existing workflows.

By March 2025, just five months after inception, the platform hosted 200+ curated skills in the main hub with an additional 300+ experimental tools in team repositories. The pace accelerated to approximately 20 new skills added per week. This growth pattern suggests that successful LLMOps adoption in large organizations may depend more on demonstrable value within existing workflows than on formal change management programs.

## Two-Tier Governance Architecture

One of the most significant LLMOps challenges when scaling AI tools across hundreds of engineers is preventing chaos: overlapping tools, stale code, conflicting prompts, and inconsistent quality. Uber's solution balances governance with innovation through a two-tier marketplace architecture that mirrors app store models while preserving the agility of open-source development.

The "Golden Marketplace" represents the production-grade tier. Skills in this tier are auto-loaded for all engineers and work out of the box without configuration. This tier enforces strict governance including manual code review, CI/CD checks, and LLM-as-a-Judge evaluation before any skill deployment. The Golden Marketplace is deliberately capped at 100-200 essential skills to prevent overwhelming engineers with choice and maintain high quality standards. This constraint forces prioritization and ensures that only genuinely valuable, well-tested tools make it to the production tier.

The second tier, which could be called the "Personal Sandbox" or experimental tier, operates with radically different constraints. Skills in this tier are shared via URLs and manually loaded by interested engineers. There's no governance, no cap on quantity, and no formal review process. This tier is explicitly designed for speed, creativity, and solving team-specific problems. As Hooda noted, "The best skills often come from a late-night discovery by someone in the engineering team, not from a centralized decision." This dual structure maintains a clean, reliable default experience while enabling junior developers across Uber's global offices to build experimental tools that may eventually graduate to the Golden Marketplace.

From an LLMOps perspective, this architecture addresses several critical concerns. It provides a clear promotion path from experimentation to production, establishes quality gates without stifling innovation, and distributes the cognitive load of skill discovery by keeping the mandatory set small while making optional tools easily accessible. The approach recognizes that not all AI applications require the same level of oversight—a tool used by one team to format log files needs different governance than a skill that reviews payment processing logic.

## Specialized Skills and Use Cases

Uber moved beyond generic "write this function" prompts to build purpose-specific skills that integrate deeply with their engineering workflows. Three categories of skills illustrate their production LLMOps approach.

The Code Review Family demonstrates sophisticated prompt engineering and context awareness. Rather than a single "Review Code" button, Uber built a tiered family of review skills. Engineers select the scrutiny level appropriate to their change: a typo fix triggers a lightweight review focused on syntax and style, while changes to payment processing logic trigger a deep architectural audit that examines security implications, data flow, and system integration points. This graduated approach reduces cognitive overhead while ensuring critical code paths receive appropriate attention. From an LLMOps perspective, this represents effective prompt specialization—different review depths require different system prompts, context windows, and evaluation criteria.

The Verification skills address one of the most common pain points in AI-assisted coding: determining whether generated code actually works as intended. For Uber's mobile teams, a verification skill automates the entire validation workflow. When code is generated for iOS applications, the skill automatically spins up iOS simulators, toggles between dark and light mode, switches between supported languages, and runs a battery of tests to confirm the generated code doesn't break UI rendering or functionality. This automation transforms verification from a manual, error-prone process to a deterministic, repeatable workflow. The LLMOps implication is significant: AI-generated code becomes practical for production only when verification can be automated at scale.

The Tribal Knowledge skills tackle knowledge management and organizational learning. Every engineering organization has senior engineers whose deep expertise exists primarily in their heads—Go garbage collection tuning techniques, specific AWS routing fixes, architectural decision rationale. At Uber, two senior engineers encoded their expertise into Claude Skills that other engineers can invoke. A junior engineer in Sydney or London can now run these skills and receive the same architectural guidance as if those senior engineers were literally looking over their shoulder. This represents a fascinating LLMOps pattern: using LLMs not just to generate code but to democratize and scale expert knowledge across time zones and experience levels. The technical implementation likely involves carefully crafted system prompts that encode decision frameworks, historical context, and debugging methodologies that senior engineers have developed over years.

## Quality Assurance and Hallucination Mitigation

Enterprise engineering directors consistently raise concerns about AI hallucinations in production systems: what happens when a model confidently generates incorrect code that takes down core services? Uber's approach centers on deterministic outputs and multi-layered verification.

Skills deployed to production cannot produce vague, qualitative assessments like "I optimized your code, looks great!" Enterprise-grade skills must report exactly what they attempted, what succeeded, what failed, and provide the exact diff of any changes. This requirement transforms AI assistance from a black box to an auditable, transparent process. Before any skill ships to the Golden Marketplace, a second AI runs a comprehensive battery of tests against it, checking outputs against expected baselines—an LLM-as-a-Judge evaluation pattern. This creates a quality gate where AI validates AI, reducing but not eliminating the need for human oversight.

Critically, engineers remain the final reviewers. The AI must show its work, and engineers maintain ultimate decision authority over what code ships to production. This human-in-the-loop pattern is essential for production LLMOps: AI augments and accelerates but doesn't replace engineering judgment. The deterministic output requirement also enables better debugging when skills fail—rather than re-running a skill and hoping for different results, engineers can examine exactly what the AI attempted and understand where the logic broke down.

From an operational perspective, this approach requires significant investment in evaluation infrastructure. Running automated test batteries against every skill before deployment implies sophisticated CI/CD integration, comprehensive test suites, and likely significant compute resources for LLM-as-a-Judge evaluation. The article doesn't detail the specific evaluation frameworks or metrics used, but the emphasis on deterministic outputs suggests they're measuring not just correctness but consistency, completeness of reporting, and adherence to output schemas.

## Architectural Evolution: From Custom Agents to Skills

The article positions Uber's approach within broader industry trends, specifically the shift away from bespoke AI agents built from scratch using complex SDKs. According to Hooda, the industry model circa 2024—building custom agents for each use case—is "dead." The new paradigm is "general agent + skills = specialization on demand."

Hooda uses a Matrix reference to explain this: "I know Kung Fu"—Neo doesn't permanently possess martial arts expertise; it's loaded as needed. Similarly, Claude serves as the general intelligence while skills act as specialized capability cartridges that can be loaded on demand. Hooda, an iOS engineer by background, can load a Data Science skill pack and suddenly interact with Claude as if he has senior data scientist capabilities—querying databases, building pipelines, designing analytics dashboards. Skills close the gap between disciplines by encoding domain expertise into reusable prompt patterns and workflows.

This architectural pattern has significant LLMOps implications. Rather than maintaining dozens of specialized models or custom-trained agents, organizations can invest in a single powerful foundation model and build a library of skills (essentially sophisticated prompt templates plus tooling integrations). This reduces infrastructure complexity, consolidates model serving costs, and simplifies governance since all skills run through a consistent underlying system. The tradeoff is that skills must be carefully designed to provide sufficient context and constraints to elicit specialized behavior from a general model—a prompt engineering challenge at scale.

The skills-based architecture also enables faster iteration. Building a new capability doesn't require model training, fine-tuning, or deploying new infrastructure. An engineer can create a new skill by encoding domain logic into prompts and workflow definitions, test it in the sandbox tier, and share it immediately. If it proves valuable, it graduates to the Golden Marketplace. This development velocity would be impossible with custom agent architectures requiring model training and deployment pipelines.

## Emerging Experiments: Graph RAG and Self-Healing Code

Uber is exploring two advanced LLMOps patterns that extend beyond current production capabilities, offering a window into future directions.

The Corporate Memory via Graph RAG experiment addresses onboarding and institutional knowledge preservation. New hires traditionally face a deluge of stale Confluence pages, scattered documentation, and tribal knowledge locked in senior engineers' memories. Uber is testing a "Recall" skill that queries a graph database containing past architectural decisions, failed experiments, and Slack conversation history. Rather than reading through hundreds of documents hoping to find relevant context, engineers can ask questions and receive answers synthesized from the organization's collective memory. This represents a sophisticated RAG (Retrieval-Augmented Generation) implementation where the knowledge base isn't just a vector database of documents but a graph structure capturing relationships between decisions, people, projects, and outcomes. The LLMOps challenge here involves maintaining data freshness, ensuring appropriate access controls (not all historical conversations should be universally accessible), and managing the computational cost of graph queries combined with LLM inference.

The Self-Healing Code experiment pushes toward autonomous systems. Code frequently breaks when environments change—an internal API gets deprecated, a dependency updates with breaking changes, cloud infrastructure evolves. Uber is testing skills that monitor their own failure rates through CI/CD telemetry. When a skill breaks because an underlying API changed, the AI analyzes the error, rewrites its own instructions (the prompts and workflow definitions that constitute the skill), and fixes itself. This represents a feedback loop where AI systems observe their own performance metrics, diagnose failures, and autonomously iterate toward solutions.

The self-healing pattern raises fascinating LLMOps questions about control and risk. If skills can rewrite themselves, how do you maintain safety boundaries? How do you prevent a skill from "fixing" itself in ways that introduce security vulnerabilities or violate business logic? The article doesn't provide implementation details, but a responsible approach would likely require self-healing changes to go through the same evaluation pipeline as human-authored changes—LLM-as-a-Judge testing, automated verification, and likely human approval before self-modified skills deploy to production. The monitoring infrastructure required is also non-trivial: skills need instrumentation to track failure rates, error patterns, and performance degradation, and this telemetry must be accessible to the AI systems doing self-diagnosis.

## Practical Implementation Recommendations

The article concludes with actionable guidance for organizations attempting similar transformations, framed as a five-step approach that emphasizes action over planning.

First, "Start, don't plan"—cancel the AI committee, find the most curious engineer, and give them a repository and Claude license to build two tools solving their immediate problems. This recommendation directly challenges traditional enterprise technology adoption but aligns with how Uber's marketplace actually emerged. The LLMOps insight is that initial value discovery happens fastest when engineers with real problems have direct access to tools, not when committees design theoretical frameworks.

Second, establish two-tier governance from the start. The Golden tier with strict governance ensures company-wide tools meet production standards, while the Wild West tier with no governance enables rapid experimentation. The guidance is explicit: "Enforce compliance at the core, not the edges." This recognizes that innovation happens at the edges but production systems require guardrails. From an LLMOps operational perspective, this means investing in evaluation infrastructure and quality gates for the production tier while keeping the experimental tier lightweight and fast.

Third, require deterministic outputs for any skill that touches code. Ban responses like "it looks great!" and mandate reporting of what was attempted, what worked, and what failed. This operational discipline enables debugging, builds trust, and creates an audit trail essential for production systems.

Fourth, encode tribal knowledge by finding top engineers and extracting their debugging frameworks and mental models into Markdown-based skills. This transforms organizational knowledge from ephemeral (in people's heads) to durable (in executable skills). The technical implication is that skills are likely defined as structured documents—possibly YAML or JSON configurations with embedded Markdown prompts—rather than code, making them accessible to engineers who aren't AI specialists.

Fifth, invest in foundational infrastructure. CI/CD pipelines, staging environments, and test coverage matter more than ever because AI agents rely on them to verify their own work. This is perhaps the most important LLMOps insight in the entire case study: AI tools don't replace engineering rigor; they amplify it. Organizations with weak testing infrastructure will struggle to deploy AI-generated code safely, while organizations with robust automated testing can confidently leverage AI assistance at scale.

## Critical Assessment and Limitations

While the case study presents a compelling narrative of grassroots AI adoption, several important caveats and potential concerns deserve attention. The article is based on a single interview and published on Medium by an author describing himself as a "startup founder," which suggests this may not represent comprehensive, independently verified reporting. The claims about growth rates, adoption numbers, and technical capabilities should be viewed as Uber's self-reported narrative rather than independently audited facts.

The article provides limited technical detail about several critical aspects. We don't know what "LLM-as-a-Judge evaluation" specifically entails—what metrics are measured, what pass/fail criteria are used, or how effective this approach is at catching problematic skills. The self-healing code experiment sounds innovative but also raises significant safety concerns that aren't addressed in detail. The governance model for the Golden Marketplace involves "manual code review," but we don't learn who performs these reviews, what their qualifications are, or how they evaluate AI-generated prompts for security and correctness.

The cost implications are entirely absent from the discussion. Running 500+ skills across thousands of engineers likely involves substantial API costs for Claude, compute costs for evaluation infrastructure, and engineering time for skill development and review. The ROI case may be compelling, but the article presents only benefits without quantifying costs or tradeoffs.

The article also doesn't discuss failure modes, incidents, or lessons learned from mistakes. In any five-month deployment of 500+ AI tools across production engineering workflows, there must have been skills that failed, caused problems, or needed to be deprecated. The absence of this discussion suggests the article may be more promotional than analytical.

The comparison to Matrix "I know Kung Fu" capabilities may oversell what skills actually deliver. Loading a Data Science skill pack doesn't actually give an iOS engineer data scientist capabilities—it gives them access to an LLM that can generate data science code with appropriate context. The engineer still needs to evaluate whether that code is correct, secure, and aligned with business needs, which requires some baseline understanding of the domain.

Finally, the "grassroots vs. top-down" framing may be somewhat misleading. While initial adoption was organic, Uber clearly has sophisticated infrastructure, governance processes, and leadership support (Hooda's title is "Head of AI Foundations & DevX") that enabled this scaling. Smaller organizations or those with less mature engineering practices might find this approach more chaotic than empowering without similar foundational capabilities.

## Conclusion and LLMOps Significance

Despite these limitations, the case study offers valuable insights into production LLMOps at scale. The two-tier governance model addresses the real tension between innovation velocity and production safety. The emphasis on deterministic outputs and LLM-as-a-Judge evaluation represents practical approaches to quality assurance for AI-generated artifacts. The skills-based architecture suggests a sustainable path for deploying specialized AI capabilities without the overhead of maintaining custom models or agents.

Perhaps most significantly, the case study demonstrates that successful LLMOps adoption may be more about organizational dynamics and workflow integration than about model capabilities or infrastructure. The tools succeeded not because they were technically sophisticated but because they solved real problems for engineers in their existing workflows, spread through organic demand rather than mandates, and provided clear value quickly enough to drive continued adoption. These lessons may be more broadly applicable than the specific technical implementation details.
