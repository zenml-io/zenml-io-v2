---
title: "AI-Native Transformation: Multi-Agent Systems and Developer Productivity at Scale"
slug: "code-with-claude-developer-event-in-london"
draft: false
llmopsTags:
  - "code-generation"
  - "healthcare"
  - "customer-support"
  - "poc"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "evals"
  - "harness-engineering"
  - "system-prompts"
  - "cicd"
  - "security"
  - "guardrails"
  - "fastapi"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "anthropic"
industryTags: "tech"
company: "Monday / Doctolib / Delivery Hero"
summary: "Three established companies—monday.com, Doctolib, and Delivery Hero—founded between 2011 and 2013, describe their transformation from pre-LLM era enterprises to AI-native organizations using Claude. The companies faced the challenge of integrating advanced AI capabilities into legacy codebases and existing engineering workflows without greenfield opportunities. Their solutions include: Delivery Hero's HeroGen autonomous software delivery system achieving 173 merged pull requests daily with an 85% success rate using a \"council of agents\" architecture; Doctolib's skills marketplace and internal platform enabling 100% Claude adoption across technical and non-technical teams; and monday.com's Vibe prompt-to-application tool leveraging their existing open platform APIs. Results demonstrate significant productivity gains, with principal engineers becoming more hands-on in code generation, teams building features end-to-end with AI assistance, and organizations successfully navigating model upgrades while maintaining quality metrics."
link: "https://www.youtube.com/watch?v=XFaeIbL-lvE"
year: 2026
seo:
  title: "Monday / Doctolib / Delivery Hero: AI-Native Transformation: Multi-Agent Systems and Developer Productivity at Scale - ZenML LLMOps Database"
  description: "Three established companies—monday.com, Doctolib, and Delivery Hero—founded between 2011 and 2013, describe their transformation from pre-LLM era enterprises to AI-native organizations using Claude. The companies faced the challenge of integrating advanced AI capabilities into legacy codebases and existing engineering workflows without greenfield opportunities. Their solutions include: Delivery Hero's HeroGen autonomous software delivery system achieving 173 merged pull requests daily with an 85% success rate using a \"council of agents\" architecture; Doctolib's skills marketplace and internal platform enabling 100% Claude adoption across technical and non-technical teams; and monday.com's Vibe prompt-to-application tool leveraging their existing open platform APIs. Results demonstrate significant productivity gains, with principal engineers becoming more hands-on in code generation, teams building features end-to-end with AI assistance, and organizations successfully navigating model upgrades while maintaining quality metrics."
  canonical: "https://www.zenml.io/llmops-database/code-with-claude-developer-event-in-london"
  ogTitle: "Monday / Doctolib / Delivery Hero: AI-Native Transformation: Multi-Agent Systems and Developer Productivity at Scale - ZenML LLMOps Database"
  ogDescription: "Three established companies—monday.com, Doctolib, and Delivery Hero—founded between 2011 and 2013, describe their transformation from pre-LLM era enterprises to AI-native organizations using Claude. The companies faced the challenge of integrating advanced AI capabilities into legacy codebases and existing engineering workflows without greenfield opportunities. Their solutions include: Delivery Hero's HeroGen autonomous software delivery system achieving 173 merged pull requests daily with an 85% success rate using a \"council of agents\" architecture; Doctolib's skills marketplace and internal platform enabling 100% Claude adoption across technical and non-technical teams; and monday.com's Vibe prompt-to-application tool leveraging their existing open platform APIs. Results demonstrate significant productivity gains, with principal engineers becoming more hands-on in code generation, teams building features end-to-end with AI assistance, and organizations successfully navigating model upgrades while maintaining quality metrics."
notion:
  pageId: "366f8dff-2538-80cd-a7fd-dfd4be601f50"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-20T15:42:00.000Z"
  lastEditedTime: "2026-08-10T12:34:00.000Z"
  publishedAt: "2026-08-10T12:33:13Z"
---

## Overview

This case study presents insights from three technology companies—monday.com (work management platform), Doctolib (healthcare technology), and Delivery Hero (global delivery network operating in 60+ markets)—discussing their journeys toward becoming AI-native enterprises. All three companies were founded between 2011 and 2013, predating the LLM era, and therefore faced unique challenges integrating Claude-powered systems into mature, production codebases ranging from 10-14 years old. The discussion reveals practical approaches to deploying LLMs at scale within complex organizational contexts, including technical architecture decisions, model management strategies, and organizational change management.

## Delivery Hero: HeroGen Autonomous Software Delivery System

Delivery Hero built an autonomous software delivery agent called HeroGen that represents one of the most ambitious production deployments of LLM technology described in this case study. The system's core capability involves taking a Jira ticket or GitHub issue and autonomously developing it to production-readiness, creating pull requests that can be merged directly into production code.

The development timeline reveals strategic foresight: the team began building HeroGen in the latter half of the previous year, anticipating model improvements rather than being limited by current capabilities. This "build for the next model, not the current one" philosophy proved prescient when Claude Opus 4.5 was released in November, transforming what had been a "fancy idea" into a functioning system. The agent launched in Q1 and demonstrated rapid adoption with exponential growth trajectory.

The quantitative results are substantial: HeroGen averages 173 merged pull requests per day over a 10-day measurement period, with approximately 7,000 total merged pull requests since the February launch. The system achieves an 85% success rate, defined as the ratio of pull requests that are accepted and merged versus those actively rejected by software engineers.

A critical architectural innovation contributing to the high success rate is the "council of agents" approach. Rather than relying on a single model to both generate and validate code, multiple different models review the same code independently. This architectural pattern addresses a fundamental challenge: avoiding situations where a model fails to detect issues in code it generated due to blind spots or inherent biases. Interestingly, implementing this multi-model review system did not increase costs as dramatically as initially anticipated, making it a practical pattern for others to adopt.

HeroGen's integration strategy prioritized working within existing developer workflows rather than forcing adoption of new interfaces. The system integrates directly with existing project management tools like Jira and GitHub Issues, allowing engineers to simply assign tickets to the agent rather than learning new interaction paradigms. This design decision appears to have significantly aided adoption rates.

The system also integrates deeply with continuous integration infrastructure. When tests fail, feedback is automatically provided to the agent for fixing. The agent even handles flaky CI tests independently. Future roadmap items include integration with security vulnerability scanning, where code-related security issues would be automatically assigned to the agent for remediation, with repository owners only needing to review the resulting pull requests.

Delivery Hero currently uses Claude Opus 4.5 for HeroGen and has not yet upgraded to newer models, primarily because they lack sufficient volume and AB testing infrastructure to make confident model migration decisions. This reveals a practical constraint in production LLM deployments: evaluating model upgrades requires sophisticated testing infrastructure and sufficient traffic to make statistically valid comparisons.

## Doctolib: Platform-Driven Skills Marketplace and Developer Enablement

Doctolib operates in the healthcare sector with a dual mission: making people healthier and improving the daily lives of healthcare professionals. Their platform includes patient-facing features like appointment booking and health records, alongside comprehensive tools for healthcare practitioners covering clinical, financial, and administrative needs.

Doctolib achieved 100% Claude adoption across their organization, notably extending beyond engineers to product managers, designers, and with the introduction of Claude for Work, a significant proportion of non-technical staff. This broad adoption represents a comprehensive organizational transformation rather than isolated engineering team usage.

The technical approach emphasizes distributed innovation rather than centralized control. Rather than limiting AI integration work to dedicated platform teams, Doctolib deliberately empowered all engineers to discover innovative applications of the technology. The platform teams' role shifted to identifying emergent best practices, removing bottlenecks, industrializing successful patterns, and scaling them across the organization.

A key technical artifact of this strategy is the skills marketplace—an internal platform where engineers can publish skills they develop, making them discoverable to the entire organization. The marketplace surfaces which skills receive the most usage and which are trending, creating visibility and encouraging adoption. The platform provides a pre-configured development environment with all necessary tools automatically connected, and popular skills are packaged directly into this environment. New employees gain immediate access to the collective knowledge base upon onboarding.

Experimental skills can be deployed via plugins, allowing safe exploration of new capabilities. The most active communication channel across the entire company became "Build with AI," where employees share learnings, ask questions, and promote skills they've developed. This community-driven approach appears to have accelerated organizational learning beyond what isolated experimentation would have achieved.

From an infrastructure perspective, Doctolib's codebase is split roughly evenly between a monolithic system created over a decade ago and more recently developed distributed services. This architectural heterogeneity creates observable differences in AI tooling effectiveness. The distributed services, built with opinionated, standardized patterns and smaller codebases, prove significantly easier for AI agents to work with compared to the monolith. Within the legacy monolith, agents often need explicit guidance to use current patterns rather than replicating outdated approaches found in the codebase.

When new Claude models are released, Doctolib experiences natural excitement and experimentation from engineers eager to explore expanded capabilities. For customer-facing AI products, dedicated teams conduct rigorous evaluations comparing performance across various metrics. For development tooling, the evaluation approach remains more qualitative, though there's recognition that more systematic verification could enable faster adoption of model improvements.

An important observation from Doctolib concerns how AI agents expose previously acceptable inefficiencies. When human coding speed was the bottleneck, minor friction in automation workflows was tolerable. With AI agents capable of rapid code generation, every remaining manual touchpoint becomes a significant constraint. This has necessitated comprehensive process re-evaluation, questioning assumptions built around human development velocity that no longer apply in an AI-augmented environment.

## Monday.com: Vibe Prompt-to-Application and Agent-First Platform Design

Monday.com is transforming from a platform for managing work to a platform that helps execute work, incorporating teams of agents and extensive native AI capabilities. Their most successful recent product launch was monday Vibe, a prompt-to-application tool that converts simple user prompts into detailed product requirement documents, refines them collaboratively with users, and generates working applications within minutes.

A fortunate architectural decision that significantly accelerated Vibe development was monday.com's early investment in an open platform for external developers. This existing API infrastructure, including GraphQL endpoints and SDKs, allowed the Vibe coding tool to operate using the same mechanisms available to third-party developers. This containment strategy enabled a proof-of-concept to be developed within days, despite the underlying system being a 14-year-old monolith with considerable technical debt.

However, as Vibe matured beyond initial POC, limitations emerged. To unlock full potential and build increasingly complex applications that interact with every platform feature, every feature must be accessible via well-designed APIs. This API-first transformation represents a much longer journey the company continues to navigate.

Monday.com employs multimodal system architecture for Vibe, with an orchestrator using the Opus model coordinating a workflow of deterministic actions and simpler models handling specific sub-tasks. This hierarchical design means model releases typically impact only specific components, making end-to-end evaluation critical even when individual components have their own atomic-level evaluations.

The migration from Claude Opus 4.5 to 4.6 proved particularly challenging. While the new model brought enhanced capabilities, system prompts that had been carefully optimized for the previous model didn't transfer effectively. The team had to substantially rethink and refine prompt techniques to harness the new model's capabilities. This required deep collaboration with Anthropic solution engineers to understand emerging best practices. This experience established a practice for major model releases: comprehensive prompt re-evaluation, end-to-end testing, and AB testing in production with real users.

From an architectural perspective, monday.com identified API-first design and agent-aware identity systems as two areas they would have prioritized earlier. The company's historical focus on building exceptional user interfaces meant API access was sometimes secondary. With agents—both internal and external—now requiring programmatic interaction, API gaps create significant friction. Additionally, the granular permission models designed for human users require fundamental rethinking to accommodate agents as first-class citizens in the system with appropriate authorization capabilities.

For monitoring and optimization, monday.com emphasizes analyzing failure cases in customer-facing AI experiences. While success rates and first-time-right metrics are important, deep investigation of failures—understanding why the wrong tool was called or why users didn't receive expected results—often reveals valuable insights and new use case opportunities.

## Cross-Cutting LLMOps Practices and Insights

### Model Management and Upgrades

All three companies have developed sophisticated approaches to model lifecycle management, though with varying levels of maturity. Model upgrades are not treated as simple drop-in replacements but rather as significant integration events requiring careful evaluation. For Delivery Hero, the lack of sufficient volume and AB testing infrastructure for HeroGen currently prevents confident model migration decisions. For monday.com, major model changes trigger comprehensive re-evaluation of prompt engineering strategies, often requiring collaboration with vendor solution engineering teams.

The companies distinguish between different evaluation requirements based on use case risk and visibility. Customer-facing AI products receive rigorous, systematic evaluation with strict performance criteria. Internal developer tooling sometimes relies more on qualitative assessment, though there's recognition this may limit velocity.

### Architectural Patterns for Legacy Integration

A consistent theme across all three organizations is the challenge of integrating cutting-edge AI capabilities into mature codebases and organizational structures. None had the luxury of greenfield development. Successful patterns include:

- **API-first design**: Treating AI agents as API consumers, leveraging existing integration layers rather than requiring deep system modifications
- **Orchestration architectures**: Using capable models as orchestrators coordinating specialized models or deterministic components for specific sub-tasks
- **Council of agents**: Multiple diverse models reviewing the same outputs to avoid single-model blind spots and biases
- **Standardization over flexibility**: Opinionated, well-documented patterns in newer services prove much more amenable to AI agent interaction than heterogeneous legacy code

### Developer Productivity Transformation

The impact on engineering practices appears substantial and somewhat counterintuitive. Principal engineers—typically focused on code review and architectural guidance rather than implementation—are now producing significantly more code directly, often by orchestrating AI agents. One data scientist developed a skill for prompt optimization using genetic algorithms, with agents executing variations and evaluations at scales impossible manually.

The shift in how work gets done is as important as productivity gains. Engineers increasingly orchestrate agents rather than writing code directly, with asynchronous interaction replaced by multi-agent collaboration patterns. This represents a fundamental change in the nature of software development work.

### Organizational Change Management

Doctolib's community-driven approach through the skills marketplace and "Build with AI" channel demonstrates how technical platforms can enable organizational learning. Rather than top-down mandates, the company created infrastructure for peer learning and sharing, allowing best practices to emerge organically and spread rapidly.

Delivery Hero took a more directive approach, mandating that every team develop at least one feature end-to-end with AI during a specific quarter. This mandate aims to overcome initial resistance by ensuring engineers directly experience the technology's capabilities, converting skeptics through hands-on results.

The message from all three organizations to engineers just beginning their AI integration journey is consistent: start immediately without waiting for perfect conditions. Legacy code, monolithic architectures, and technical debt are not blockers. Begin with repetitive toil that burdens teams, and use that as a proving ground for AI capabilities available today.

### Emerging Bottlenecks and Process Re-evaluation

An important insight from Doctolib highlights how AI agents reveal previously hidden inefficiencies. When human development speed was the primary constraint, minor friction in adjacent processes was acceptable. With AI dramatically accelerating code generation, every remaining manual step becomes a proportionally larger bottleneck. This necessitates comprehensive re-evaluation of development processes, CI/CD pipelines, deployment procedures, and organizational workflows built around assumptions that no longer hold.

### Metrics and Monitoring

The companies monitor different metrics based on their priorities:

- Delivery Hero focuses on merged pull request volume and success ratio for HeroGen
- Doctolib emphasizes quality and reliability metrics as control KPIs ensuring velocity gains don't compromise system stability
- Monday.com prioritizes failure analysis in customer-facing AI experiences, mining failures for insights about unmet needs and new use case opportunities

This variety suggests there isn't yet a standardized set of LLMOps metrics, with companies developing measurement approaches tailored to their specific implementations and organizational contexts.

### Security and Quality Assurance

Delivery Hero's planned integration with security vulnerability scanning—automatically assigning code-related vulnerabilities to HeroGen for remediation—represents an interesting evolution: using AI agents not just for new feature development but for maintaining and securing existing systems. The council of agents pattern serves as a quality assurance mechanism, with diverse models providing independent review to catch issues that might escape single-model evaluation.

### Identity and Authorization for Agent-First Systems

Monday.com's observation about identity systems and authorization models reveals an underappreciated challenge in AI-native architectures. Permission systems designed for human users don't naturally extend to agents acting with various levels of autonomy and authority. Treating agents as first-class users requires fundamental rethinking of authentication, authorization, and auditability—work that's easier to design in from the beginning than retrofit into mature systems.
