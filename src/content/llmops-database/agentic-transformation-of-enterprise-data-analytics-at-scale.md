---
title: "Agentic Transformation of Enterprise Data Analytics at Scale"
slug: "agentic-transformation-of-enterprise-data-analytics-at-scale"
draft: false
llmopsTags:
  - "data-analysis"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "semantic-search"
  - "evals"
  - "orchestration"
  - "meta"
industryTags: "tech"
company: "Meta"
summary: "Meta faced a critical data access problem where millions of datasets existed but decision-makers experienced massive friction in getting answers, requiring multiple tools, skill sets, and often different teams to move from question to answer. The company built an AI Data Stack centered on data agents that collapsed the entire chain of data discovery, querying, visualization, and interpretation into conversational interfaces. By focusing on three core components—composable data skills for reach, semantic models and context for truth, and orchestrating agents—Meta achieved remarkable adoption with 60% of non-data experts using data agents weekly and 67% of dashboard creation shifting to agent-built applications within four months of launch. The solution required moving beyond prompt engineering to building a platform infrastructure with tools, capabilities, and structured business context that enables trusted data answers at scale."
link: "https://www.youtube.com/watch?v=BQf0TxsOMUg"
year: 2026
seo:
  title: "Meta: Agentic Transformation of Enterprise Data Analytics at Scale - ZenML LLMOps Database"
  description: "Meta faced a critical data access problem where millions of datasets existed but decision-makers experienced massive friction in getting answers, requiring multiple tools, skill sets, and often different teams to move from question to answer. The company built an AI Data Stack centered on data agents that collapsed the entire chain of data discovery, querying, visualization, and interpretation into conversational interfaces. By focusing on three core components—composable data skills for reach, semantic models and context for truth, and orchestrating agents—Meta achieved remarkable adoption with 60% of non-data experts using data agents weekly and 67% of dashboard creation shifting to agent-built applications within four months of launch. The solution required moving beyond prompt engineering to building a platform infrastructure with tools, capabilities, and structured business context that enables trusted data answers at scale."
  canonical: "https://www.zenml.io/llmops-database/agentic-transformation-of-enterprise-data-analytics-at-scale"
  ogTitle: "Meta: Agentic Transformation of Enterprise Data Analytics at Scale - ZenML LLMOps Database"
  ogDescription: "Meta faced a critical data access problem where millions of datasets existed but decision-makers experienced massive friction in getting answers, requiring multiple tools, skill sets, and often different teams to move from question to answer. The company built an AI Data Stack centered on data agents that collapsed the entire chain of data discovery, querying, visualization, and interpretation into conversational interfaces. By focusing on three core components—composable data skills for reach, semantic models and context for truth, and orchestrating agents—Meta achieved remarkable adoption with 60% of non-data experts using data agents weekly and 67% of dashboard creation shifting to agent-built applications within four months of launch. The solution required moving beyond prompt engineering to building a platform infrastructure with tools, capabilities, and structured business context that enables trusted data answers at scale."
notion:
  pageId: "389f8dff-2538-8033-b5a0-d7078bdcfb8e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-24T13:54:00.000Z"
  lastEditedTime: "2026-06-24T13:54:00.000Z"
  publishedAt: "2026-07-06T07:19:40Z"
---

## Overview and Business Context

Meta's Engineering Director for AI and Data Infrastructure presented a comprehensive case study on the agentic transformation of their data analytics platforms. The presentation opened with a striking statistic: agent queries increased 30x over six months, signaling a fundamental shift in how people interact with data at the company. The business problem was clear—despite having millions of datasets, tens of thousands of decision-makers, and powerful infrastructure, there existed an enormous gap between data availability and actionable insights. The traditional workflow required discovering data, querying it, visualizing results, and interpreting findings across different tools, skill sets, and often different teams. This friction slowed decision-making or caused decisions to be made without data backing at all, which was particularly problematic for a company where every product decision and even critical leadership decisions about company direction are data-driven.

The transformation that Meta undertook represents a significant LLMOps implementation focused on production-grade data agents. The presenter made a bold claim that they were essentially eliminating coded dashboards at Meta, replacing a decade-old workflow with conversational AI agents. This wasn't about building a prototype or proof of concept—the systems described were handling production workloads for a significant portion of Meta's workforce, representing one of the more substantial enterprise LLM deployments documented in the data analytics space.

## The Trust Problem in Agentic Systems

A central theme throughout the presentation was the trust challenge that emerged when removing human intermediaries from data workflows. In the traditional model, data teams served as trust layers—they understood tables, caveats, and context, and while answers took time, they could be trusted. When agents collapse the entire chain into a single conversation, trust is no longer free. The presenter emphasized a critical asymmetry: wrong code is visible because it throws errors, but wrong data is not visible and simply becomes decisions made in meetings. This observation cuts to the heart of a major LLMOps challenge in production systems—ensuring not just that systems work technically but that they produce correct and trustworthy outputs at scale.

The multiplier effect compounds this trust problem. With hundreds of thousands of queries happening daily through agent interfaces, wrong answers at scale could lead to systematically poor decision-making across the organization. The presenter noted that better reasoning over wrong data just delivers wrong answers more confidently, highlighting that model improvements alone don't solve the fundamental trust challenge in data analytics applications.

## Architecture: The AI Data Stack

Meta's solution architecture, which they call the AI Data Stack, was built from the ground up in four layers:

At the bottom sits what they candidly called the "data swamp"—the raw data itself. Above this is the foundation of context, which represents structured knowledge about what the data actually means. This includes semantic models, metric definitions, business rules, and caveats. The presenter was emphatic that nothing can be trusted without this layer, positioning context as the first essential component rather than an afterthought.

The third layer consists of composable data skills that give agents reach. These skills include the ability to discover appropriate datasets from millions of catalog entries, understand and disambiguate schemas, generate semantically valid queries, determine appropriate visualizations, and other data-related capabilities. Critically, these are implemented as tools that agents invoke rather than instructions baked into agent personas, representing a more modular and maintainable architectural choice.

At the top sits the orchestrator or agent itself, which handles reasoning and coordination. The architectural philosophy expressed here is important from an LLMOps perspective: the agent is only as good as the reach and truth that sits underneath it. This represents a deliberate choice to invest in infrastructure and context rather than focusing exclusively on prompt engineering or model improvements.

## Semantic Models and Structured Context

The semantic model implementation provides concrete grounding for the abstract concept of "truth" in the architecture. A semantic model in their system is a structured statement that defines precisely what a particular column like revenue or engagement means—specifying which surfaces it covers, which it excludes, computation frequency, and related metadata. Beyond individual semantic models, the context layer includes metric definitions, verified queries, business rules, and documented caveats.

This approach addresses a fundamental challenge in large enterprises: the same term like "revenue" or "engagement" can mean vastly different things depending on context. Instagram revenue differs from ads revenue, and without structured disambiguation, even sophisticated language models will make incorrect choices. The semantic models encode decades of institutional knowledge from data scientists and engineers who deeply understand these distinctions, allowing agents to inherit expertise rather than attempting to infer or guess correct interpretations.

From an LLMOps perspective, this represents a significant investment in structured metadata and knowledge representation that sits outside the model itself but is essential for production reliability. The composability of this approach means that every semantic model added improves every agent on the platform, creating a compounding return on investment.

## The Three Phases of Development

Meta's journey to trusted agents progressed through three distinct phases, each revealing important lessons about LLMOps in practice:

Phase one involved scaffolding the workflow through extensive prompt engineering. They wrote thousands of lines of instructions telling agents exactly how to be data analysts—how to find tables, handle schemas, manage edge cases. This approach worked initially but proved brittle and hit a ceiling quickly. This phase represents the typical early-stage LLM implementation pattern that many organizations experience.

Phase two focused on upgrading reasoning by leveraging better models as they became available. Accuracy improved temporarily but then plateaued. The realization here was crucial: better reasoning over wrong data just produces wrong answers with more confidence. Models didn't inherently know which of fifteen different revenue tables or engagement metrics to select or how to interpret them correctly, so they would pick one and deliver results confidently despite potential incorrectness.

Phase three represented the breakthrough and involved a fundamental architectural shift. Rather than telling agents how to do things through instructions, Meta provided tools and capabilities for reach plus structured context for truth. This was described as a step function change that led to the internal mantra: "Models give you the reasoning. Tools give you the reach. The context gives you the truth." This phase represents mature LLMOps thinking where the focus shifts from prompt optimization to building robust infrastructure and knowledge systems that support agent capabilities.

## Production Systems and User Adoption

The presentation described two main production flows: consumption and creation, which form a flywheel where each feeds into the other.

For consumption, Meta built Data Maid, a data analytics agent that allows users to ask questions in plain English and receive answers with citations. The system navigates millions of catalog entries, distinguishes between multiple sources for the same conceptual metric, understands context-dependent meanings, and generates semantically correct queries. Importantly, it also knows what it doesn't know and explicitly states limitations. Every answer links back to source data, with citations positioned not as a nice-to-have feature but as an essential trust mechanism. Users can trace exactly where every number originated.

The practical impact was substantial. Questions that previously required filing requests and waiting days now return traceable answers in seconds. For example, when a product lead needs to understand why engagement dropped 3%, they get immediate analysis rather than entering a multi-day workflow.

For creation, the system enables building production-quality data applications through natural language descriptions. The agent handles data discovery, query generation, visualization selection, and layout design. Users can iterate conversationally to refine the data story they want to tell. This represented a direct replacement for the traditional dashboard creation workflow where requests would be filed, data teams would build dashboards over days or weeks, and any changes would require repeating the entire process.

The adoption metrics were striking: the creation capability launched less than four months before the presentation, and already 67% of dashboard creation at Meta happened through agent-built applications rather than the legacy platform that had been in use for over a decade. This represents rapid behavior change and suggests genuine user value rather than forced adoption.

Another key metric indicated that 60% of non-data experts were using data agents weekly. These were people who had never written queries before but were now getting data answers in seconds. This democratization of data access was positioned as a major win, fundamentally changing who could make data-informed decisions in the organization.

## Evaluation and Quality Assurance

Meta implemented rigorous evaluation frameworks to ensure agent reliability. They measured performance on standard company data benchmarks using pass rate metrics, tracking accuracy across the three development phases. The results showed meaningful improvements as they moved from pure prompt engineering through model upgrades to the tools-and-context approach.

They also introduced a consistency metric called "pass per key" that measured whether asking the same question five times produced the same answer five times. Given the non-deterministic nature of language models, achieving consistency required the right combination of tools and context. The presenter emphasized that for trust, consistency matters as much as accuracy—a critical insight for production LLM systems.

The evaluation approach recognized that in production environments, user trust depends not just on getting right answers but on getting reliably consistent answers that users can depend on for decision-making. This dual focus on accuracy and consistency represents mature thinking about LLM evaluation in production contexts.

## Key Lessons and LLMOps Principles

The presentation distilled three major takeaways for anyone building data agents at scale:

First, invest in what you can control. Better models will continue to arrive and they will help, but organizations don't control model improvement timelines. What they do control is the skills and context they can build and provide. Unlike prompt scaffolding, investment in capabilities and context compounds over time. Every skill added and every semantic model encoded makes every agent on the platform better. This represents a strategic choice to focus infrastructure investment where it has lasting value rather than chasing model-specific optimizations.

Second, this is an infrastructure play, not an agent play. While they see data agents today, tomorrow will bring different entry points and potentially proactive systems. The platform underneath must provide trust, capabilities, and context at scale for Meta's data complexity. It must also handle query volume that will scale dramatically—the 30x growth in six months suggests exponential patterns. With millions of tables, ambiguous semantics, and constantly evolving schemas, this represents a hard scaling problem that requires platform thinking rather than point solution development.

Third, context cannot be built in a vacuum. Data scientists and engineers possess decades of institutional knowledge about what different metrics mean in different contexts. This knowledge must be encoded into semantic models so agents inherit expertise rather than guessing. This requires partnership between platform builders and domain experts, representing an organizational challenge as much as a technical one.

## Ongoing Challenges and Future Work

The presentation was candid about remaining challenges, positioning success not as problem completion but as intensification of complexity at scale. Three major challenge areas were identified:

Trust becomes a bigger problem as the system grows. More data sets, more use cases, different requirements around freshness, ownership, and reliability all compound trust challenges. The presenter positioned making wrong data as visible as wrong code as the real frontier—not just removing friction or increasing speed but fundamentally ensuring correctness at Meta's scale and complexity.

Scale presents distinct infrastructure challenges. When humans asked questions, there was inherent rate limiting on query volume. With agents taking over and working on behalf of humans at 30x the previous rate, the data warehouse must handle dramatically higher query volumes. This represents a real infrastructure scaling challenge beyond the agent technology itself.

Quality becomes a compounding problem when agents create artifacts that generate further agent activity. Agents create applications that surface questions, which agents answer, which leads to more applications telling data stories. At exponential scale, maintaining quality of these generated artifacts requires systematic approaches to quality assurance.

The presenter noted that Meta internally says the journey is only 1% finished, acknowledging substantial work remains despite impressive current results.

## Balanced Assessment

From an LLMOps perspective, this case study represents a sophisticated and mature implementation with several notable strengths. The architectural focus on separating concerns—reasoning in models, reach through tools, truth through context—provides a maintainable and scalable approach. The investment in semantic models and structured context addresses a real challenge in enterprise LLM deployments where domain knowledge and institutional understanding are critical for correctness.

The evaluation approach combining accuracy and consistency metrics shows thoughtful consideration of what trust means in production environments. The adoption metrics, particularly the 67% shift in dashboard creation to the new platform within four months, suggest genuine user value rather than mandated adoption.

However, the presentation is clearly promotional in nature, being delivered at what appears to be a company event. Several areas warrant skepticism or at least acknowledgment of missing information. The claim about "wiping coding dashboards away" is dramatic but comes from someone leading the initiative with incentives to present it as successful. While the 67% adoption rate is impressive, we don't know what happened to quality—are these agent-built dashboards as robust and error-free as human-built ones? The 60% weekly usage among non-data experts is positive but doesn't tell us about depth of usage, abandonment rates, or error rates.

The trust problem that the presentation spends considerable time on is real and important, but the evidence provided about how well it's been solved is limited to benchmark metrics and consistency scores. We don't see data on actual error rates in production, user-reported issues, or decisions that were made incorrectly based on agent outputs. The emphasis on citations and traceability is architecturally sound, but whether users actually check citations or simply trust confident-sounding agent outputs remains unclear.

The scale claims, particularly the 30x increase in agent queries, could represent genuine adoption or could reflect agents making many queries to answer single user questions—the presentation doesn't disambiguate these interpretations. The infrastructure scaling challenges mentioned as remaining work suggest the current system may be hitting constraints.

Despite these caveats, the case study provides valuable insights into production LLM deployment at enterprise scale, particularly the architectural choice to invest heavily in structured context and composable tools rather than relying primarily on prompt engineering or model improvements. The three-phase journey from prompt scaffolding through model upgrades to infrastructure investment mirrors patterns likely to be repeated across many enterprise LLM deployments, making this a valuable reference point for understanding what mature LLMOps looks like in practice.
