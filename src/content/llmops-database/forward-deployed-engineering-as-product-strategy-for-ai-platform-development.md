---
title: "Forward Deployed Engineering as Product Strategy for AI Platform Development"
slug: "forward-deployed-engineering-as-product-strategy-for-ai-platform-development"
draft: false
llmopsTags:
  - "poc"
  - "data-analysis"
  - "data-integration"
  - "data-cleaning"
  - "prompt-engineering"
  - "agent-based"
  - "databases"
  - "elasticsearch"
  - "redis"
  - "cache"
  - "monitoring"
  - "devops"
  - "scalability"
  - "reliability"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Kepler"
summary: "Kepler, building on lessons learned from Palantir's foundational data platform development, uses Forward Deployed Engineering (FDE) as a core product strategy rather than a go-to-market function. The approach involves embedding engineers directly with customers in their operational environments to discover real problems through observation rather than requirements gathering, shipping rapid solutions to earn trust, defining the ontological language that becomes the foundation for future products, and carefully balancing quick fixes with production-ready solutions. This methodology enabled Palantir to build Foundry, a generalized data platform informed by thousands of hours of field deployments in critical environments like Iraq and Afghanistan, and is now being applied at Kepler to develop AI products with genuine product-market fit."
link: "https://www.youtube.com/watch?v=1OMHGsUZiqA"
year: 2026
seo:
  title: "Kepler: Forward Deployed Engineering as Product Strategy for AI Platform Development - ZenML LLMOps Database"
  description: "Kepler, building on lessons learned from Palantir's foundational data platform development, uses Forward Deployed Engineering (FDE) as a core product strategy rather than a go-to-market function. The approach involves embedding engineers directly with customers in their operational environments to discover real problems through observation rather than requirements gathering, shipping rapid solutions to earn trust, defining the ontological language that becomes the foundation for future products, and carefully balancing quick fixes with production-ready solutions. This methodology enabled Palantir to build Foundry, a generalized data platform informed by thousands of hours of field deployments in critical environments like Iraq and Afghanistan, and is now being applied at Kepler to develop AI products with genuine product-market fit."
  canonical: "https://www.zenml.io/llmops-database/forward-deployed-engineering-as-product-strategy-for-ai-platform-development"
  ogTitle: "Kepler: Forward Deployed Engineering as Product Strategy for AI Platform Development - ZenML LLMOps Database"
  ogDescription: "Kepler, building on lessons learned from Palantir's foundational data platform development, uses Forward Deployed Engineering (FDE) as a core product strategy rather than a go-to-market function. The approach involves embedding engineers directly with customers in their operational environments to discover real problems through observation rather than requirements gathering, shipping rapid solutions to earn trust, defining the ontological language that becomes the foundation for future products, and carefully balancing quick fixes with production-ready solutions. This methodology enabled Palantir to build Foundry, a generalized data platform informed by thousands of hours of field deployments in critical environments like Iraq and Afghanistan, and is now being applied at Kepler to develop AI products with genuine product-market fit."
notion:
  pageId: "3acf8dff-2538-8027-8991-ce4893ee0eaa"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-29T06:58:00.000Z"
  lastEditedTime: "2026-07-29T06:58:00.000Z"
  publishedAt: "2026-08-06T11:49:37Z"
---

## Overview

This case study presents a comprehensive framework for building AI and data platforms through Forward Deployed Engineering (FDE), drawing primarily from Palantir's development of Foundry between 2013 and the present, with current applications at Kepler. The speaker, a founding engineer at Kepler who previously led Palantir's Project Frontline rotation program and built similar functions at Citadel, argues that FDE should be understood fundamentally as a product strategy rather than a sales or customer success function. The methodology centers on embedding engineers directly in customer environments to observe actual workflows, rapidly ship solutions, define ontological frameworks, and build generalized product capabilities informed by field insights.

While the talk doesn't focus exclusively on LLMs, it provides critical context for how modern AI companies are approaching product development and deployment, particularly relevant given the current emphasis on agents, skills, and multi-modal AI systems. The speaker explicitly references how AI terminology like "agents," "skills," and "MCPs" (Model Context Protocols) are being defined and adopted in real-time through this forward-deployed approach, making this methodology directly applicable to LLMOps challenges.

## The FDE Product Strategy Framework

The core thesis challenges conventional wisdom about forward deployed engineering. Rather than treating FDEs as customer-facing software engineers whose primary job is making customers successful, the framework positions them as extensions of the product team responsible for discovering what to build. This distinction matters enormously for AI/ML products where the solution space is often unclear and customer requirements are typically expressed as imagined solutions rather than underlying problems.

The speaker emphasizes that FDE became Palantir's go-to-market strategy only after years of using it as a product strategy. The initial use case involved building foundational data platform capabilities that would eventually enable the company's broader commercial success. This sequence is crucial for early-stage companies building AI products: using embedded engineers to discover and validate core product capabilities before scaling to a sales-oriented deployment model.

## Detect the Real Problem and Ship the Real Thing

The first principle emerges from a logistics company deployment where a VP of operations generated a 47-page requirements document requesting a custom dashboard with 14 metrics, drill-down alerts, and a massive BI tool estimated at three months of development. After four months of scoping, an engineer who happened to visit the site asked the dispatcher what they would do first thing Monday morning with this system. The answer was simple: check if trucks are late and call to ship replacement inventory. The entire requirement collapsed into a Slack alert that was built and shipped in four hours.

This case illustrates a fundamental challenge in AI/ML product development: customers describe solutions they can imagine rather than problems they actually have. For LLMOps specifically, this manifests when users request complex agent frameworks, elaborate RAG systems, or sophisticated prompt engineering when their actual need might be a simple API call with structured output. The FDE's role is to understand three critical questions before building anything: What are you trying to accomplish? What happens after you have the solution? How are you solving it today?

The framework advocates for a bias toward action: if solving the identified problem takes less than a day of work, just build and ship it rather than expanding it into a broader product strategy. This creates a virtuous cycle where quick wins earn trust and access to deeper problems that do require generalized solutions. The key insight is that whoever defines the problem owns the solution, giving the FDE control over the narrative and subsequent product direction.

For AI products, this approach directly counters the tendency to over-engineer solutions. Rather than immediately reaching for complex LLM architectures with retrieval augmentation, fine-tuning, and multi-agent orchestration, the FDE methodology encourages starting with the simplest possible solution that addresses the actual workflow problem, then building complexity only as genuine needs emerge from production use.

## Actions Speak Louder Than Words: Observational Product Discovery

The second principle centers on observation rather than interview. In a data quality scenario, an engineer was adamantly opposed to migrating from CSV to Parquet file formats for daily terabyte-scale S3 drops. Despite clear technical benefits in pipeline performance and cost reduction, she resisted for over a year, repeatedly saying Parquet was "way worse" and "doesn't work."

The breakthrough came when engineers went on-site and observed her actual workflow. She was manually downloading CSVs to her Windows computer, double-clicking them to open in Excel, and performing visual spot-checks for data quality. Parquet files didn't have a native viewer that supported this workflow. Once engineers built a simple Parquet viewer that night, she approved the migration within two days, reducing pipeline execution time from 17 hours to approximately two hours while massively reducing storage costs.

This case reveals critical insights for LLMOps deployment. User resistance to technically superior solutions often stems from workflow disruptions that aren't articulated in requirements gathering or surveys. The framework identifies specific observational signals that indicate product opportunities:

- Any task a user performs more than once (daily, hourly, or within a single session) represents a pattern worth investigating
- Copying and pasting between tools indicates integration opportunities
- Visceral reactions like "Well, I have to" signal pain points users have accepted as unavoidable
- Switching between tools or tabs suggests workflow fragmentation
- Users pulling out their phones during tasks indicates waiting time or frustration with the current process

For AI products, these signals are particularly valuable because users often lack mental models for what's possible with LLMs. They can't articulate that they want a natural language interface to their data warehouse or that document processing could be automated with vision models because these solutions are outside their experience. Observation reveals the underlying workflow friction that AI capabilities could address.

The framework emphasizes that the most valuable intelligence is never in documentation and can't be surveyed. Physical presence at customer sites—being badged into their buildings, having a contractor email address—provides "data mining permits" that unlock information about actual workflows. The principle is summarized as "residents get the truth," advocating for embedded presence rather than remote discovery.

## Define the Language, Control the Narrative: Ontology as Product Foundation

The third principle addresses a challenge universal to enterprise systems but particularly acute in AI deployments: different teams use different terminology for identical concepts. In the example provided, sales calls them "customers," operations calls them "clients," finance calls them "billing entities," and developers call them "org IDs." This linguistic fragmentation causes integration failures, data quality issues, and pipeline breakdowns.

Palantir's ontology concept emerged not from a deliberate design decision but from recognizing that humans naturally operate in their own semantic domains. Rather than forcing everyone into a single schema, the FDE approach involves identifying what entities (nouns) and operations (verbs) exist across an organization, then canonicalizing terminology in the product itself. When users adopt the product, they also adopt its language.

For LLMOps, this principle has direct contemporary relevance. The speaker specifically calls out that the field can't even define "FDE" consistently, yet teams are trying to define "agents," "skills," and other AI constructs. Terms like "agent" might mean a prompt with function calls, a series of orchestrated steps, or something else entirely depending on the team. MCPs are mentioned as another example of terminology that's being actively defined and adopted across the ecosystem.

The FDE's role in ontology definition involves understanding:

- Which phrases, nouns, and terms are overloaded with multiple meanings
- Where integration points exist between systems (Snowflake to Databricks, Palantir to Tableau, Anthropic to SAP)
- What translation layers exist where terminology shifts between systems
- What the immutable systems of record are that can't be replaced
- What words people use when describing their issues and workflows

By defining these terms within the product solution, FDEs create a linguistic foundation that locks in the platform. When users think and communicate using your product's vocabulary, switching costs extend beyond technical integration to conceptual frameworks. For AI products, establishing shared language around concepts like agent capabilities, skill definitions, context management, and model selection becomes foundational to how organizations think about deploying LLMs in production.

## Ship Fast but Build for Production: Managing Technical Debt

The fourth principle addresses the tension between rapid iteration and sustainable engineering. The cautionary tale involves a quick Groovy script built as a temporary fix for data retention at a customer site. Twelve months later, it was running across a 100,000-person organization, and the engineer had become known as "venue.groovy" (their nickname at Palantir), with wedding guests wearing shirts with that moniker. The hack fixed a problem but was never productized, forcing years of support for code never intended for production.

This illustrates a fundamental truth: every hack goes into production. If something makes a user's life easier, it will be deployed, regardless of original intentions. The most dangerous words in engineering are "this is just temporary." The framework argues that this is especially true for FDEs because their solutions directly address user pain points, creating immediate adoption pressure.

For LLMOps, this principle is particularly critical because the rapid iteration cycles enabled by prompt engineering and API-based model access make it trivially easy to ship solutions that work but aren't production-ready. A quick prompt chain that solves a user's problem will get embedded in workflows even if it has no error handling, monitoring, or cost controls. The framework recommends calibrating what to ship by asking:

- Will I get a 2 AM phone call about this in six months?
- What's the trade-off for solving this problem quickly versus building it properly?
- Who do I hand this off to when I leave the customer site?
- What happens when this breaks, and who will be responsible?
- Am I building something so mission-critical that failures will have serious consequences?

The recommendation is to ship everything as if it will run for 18 months, because it probably will. This doesn't mean avoiding quick solutions, but rather being intentional about which solutions get folded into the core product offering versus which remain customer-specific implementations. FDEs need to distinguish between hacks that win customer goodwill in the short term and investments that create product leverage for the long term.

For AI products specifically, this means thinking carefully about prompt quality, model selection, fallback strategies, monitoring, and cost management even for "quick" solutions. The ease of prototyping with LLMs creates a dangerous illusion that production deployment is equally simple, but operational concerns around reliability, cost, latency, and failure modes require the same engineering discipline as any production system.

## The FDE Cheat Sheet: Product Leverage Over Requirements Gathering

The framework contrasts two approaches to FDE. The incorrect approach treats it like product management and customer success: taking requirements, scheduling user research, adding insights to a backlog, and running processes. This creates documentation and relationships but doesn't fundamentally steer the product.

The correct approach, which enabled Foundry's creation:

- Redefines the problem through direct observation rather than accepting stated requirements
- Gets badged on-site and deploys to where customers actually work, including extreme environments
- Ships the fix before leaving the customer site to win goodwill and earn deeper access
- Owns the fix end-to-end in the product ecosystem rather than handing off customer-specific solutions
- Translates problems into nouns and verbs that define the foundation for subsequent product development
- Takes responsibility for being the one who gets called when things break

The critical question isn't what FDEs learned in the process but what they shipped from a product perspective. Product leverage is the only metric that matters—not customer satisfaction scores or user research artifacts, but shipping generalizable capabilities that solve problems across customers.

## Application to LLMOps and Modern AI Development

While the talk draws primarily on experiences from 2013-2020s data platform development, the methodology applies directly to contemporary LLMOps challenges. The speaker explicitly connects the framework to current AI development, mentioning how terminology like "skills," "agents," and "MCPs" is being defined through similar processes today.

For companies building AI products, several elements are particularly relevant:

**Problem Discovery in an Immature Domain**: When users lack mental models for what's possible with LLMs, stated requirements are especially unreliable. The observational approach identifies workflow friction that AI could address even when users can't articulate AI-specific solutions.

**Rapid Iteration with Production Consequences**: The ease of prototyping with LLM APIs creates pressure to ship quickly, making the "ship fast but build for production" principle critical. Quick prompt chains become production dependencies faster than traditional software.

**Ontology and Abstraction Levels**: AI products require careful definition of abstractions (what's an agent? what's a skill? what's a tool?). The FDE approach of defining language through shipped product creates standardization organically rather than through top-down specification.

**Embedding vs. Remote Development**: The emphasis on physical presence challenges remote-first AI development approaches. While LLMs can augment remote work, the framework argues that deep problem discovery still requires being "in the room where it happens."

**Trust Through Delivery**: In an environment where AI capabilities are often oversold, shipping actual working solutions builds credibility that enables access to harder problems worth solving with more sophisticated approaches.

## Critical Assessment and Limitations

While the framework provides valuable insights, several considerations deserve attention:

**Selection Bias**: The examples primarily come from Palantir's successes, with limited discussion of situations where the FDE approach failed or was inefficient. The methodology's effectiveness may depend on factors like customer sophistication, problem domain, and company resources.

**Scalability Questions**: The approach is explicitly positioned as appropriate for early-stage product development rather than mature go-to-market motions. The transition point from FDE-as-product-strategy to FDE-as-sales-function isn't clearly defined, and the applicability to companies without Palantir-scale resources is uncertain.

**Observational Bias**: While observation is positioned as superior to interviews, it comes with its own biases. What engineers notice and prioritize reflects their own expertise and assumptions. The framework doesn't address how to ensure observational insights represent broader user needs rather than edge cases.

**Production Readiness Trade-offs**: The tension between "ship in under a day" and "build for 18 months in production" isn't fully resolved. The framework doesn't provide clear decision criteria for when to prioritize speed versus robustness, particularly for safety-critical or high-stakes applications.

**Geographic and Access Constraints**: The emphasis on physical presence ("residents get the truth") may not scale to global customer bases or remote-first organizations. While the principle is valuable, practical limitations on travel and on-site access aren't addressed.

## Relevance to Modern LLMOps Practice

Despite these limitations, the framework offers important correctives to common LLMOps anti-patterns:

**Over-engineering**: The bias toward solving problems in under a day counters the tendency to immediately build complex agent frameworks when simpler solutions would suffice.

**Requirements Gathering**: The focus on observation over interviews addresses the challenge that users often can't articulate needs for capabilities they've never experienced.

**Linguistic Lock-in**: The ontology principle provides a framework for building moats around AI products beyond just model performance or feature sets.

**Technical Debt Management**: The recognition that all hacks become production code encourages thinking about operational concerns from the first prototype.

The mention of Kepler applying this methodology suggests active validation in contemporary AI product development, though specific Kepler examples aren't provided in the talk. The framework's application to defining emerging AI terminology (agents, skills, MCPs) indicates ongoing relevance to LLMOps practice as the field establishes shared abstractions and deployment patterns.

Overall, this case study provides a methodological framework for AI product development that prioritizes embedded observation, rapid shipping, ontological definition, and production-ready engineering. While presented through historical examples from data platform development, the principles translate directly to LLMOps challenges around problem discovery, abstraction definition, and sustainable deployment of AI capabilities in production environments.
