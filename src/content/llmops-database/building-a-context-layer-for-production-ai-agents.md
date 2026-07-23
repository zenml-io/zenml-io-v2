---
title: "Building a Context Layer for Production AI Agents"
slug: "building-a-context-layer-for-production-ai-agents"
draft: false
llmopsTags:
  - "customer-support"
  - "data-analysis"
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "memory"
  - "human-in-the-loop"
  - "mcp"
  - "langchain"
  - "crewai"
  - "anthropic"
  - "google-gcp"
industryTags: "tech"
company: "Atlan"
summary: "Atlan, a company that helps organizations make AI understand their business, evolved from bootstrapping individual specialized agents to building a unified context layer architecture over an 18-month period. The initial approach of creating isolated agents for specific tasks faced challenges including context engineering overhead, agent silos, lack of shared learning, and context sprawl across different agent frameworks. The solution involved developing a centralized company brain or context layer that manages knowledge, skills, and business norms as version-controlled assets similar to code, enabling 300 skills and 40 agents to work cohesively. This approach addressed dependency management, quality ownership, security governance, and context portability while creating compounding learning loops from AI interactions."
link: "https://www.youtube.com/watch?v=8G_1-3IO4ZQ"
year: 2026
seo:
  title: "Atlan: Building a Context Layer for Production AI Agents - ZenML LLMOps Database"
  description: "Atlan, a company that helps organizations make AI understand their business, evolved from bootstrapping individual specialized agents to building a unified context layer architecture over an 18-month period. The initial approach of creating isolated agents for specific tasks faced challenges including context engineering overhead, agent silos, lack of shared learning, and context sprawl across different agent frameworks. The solution involved developing a centralized company brain or context layer that manages knowledge, skills, and business norms as version-controlled assets similar to code, enabling 300 skills and 40 agents to work cohesively. This approach addressed dependency management, quality ownership, security governance, and context portability while creating compounding learning loops from AI interactions."
  canonical: "https://www.zenml.io/llmops-database/building-a-context-layer-for-production-ai-agents"
  ogTitle: "Atlan: Building a Context Layer for Production AI Agents - ZenML LLMOps Database"
  ogDescription: "Atlan, a company that helps organizations make AI understand their business, evolved from bootstrapping individual specialized agents to building a unified context layer architecture over an 18-month period. The initial approach of creating isolated agents for specific tasks faced challenges including context engineering overhead, agent silos, lack of shared learning, and context sprawl across different agent frameworks. The solution involved developing a centralized company brain or context layer that manages knowledge, skills, and business norms as version-controlled assets similar to code, enabling 300 skills and 40 agents to work cohesively. This approach addressed dependency management, quality ownership, security governance, and context portability while creating compounding learning loops from AI interactions."
notion:
  pageId: "3a5f8dff-2538-80ff-851c-d9aa676d5909"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-22T07:26:00.000Z"
  lastEditedTime: "2026-07-22T07:26:00.000Z"
  publishedAt: "2026-07-23T09:03:15Z"
---

## Overview

Atlan is a company founded by Prakalpa that positions itself as solving the fundamental problem of AI not understanding business context. Working with companies ranging from GitLab, Zoom, Discord, and Affirm to large enterprises like MasterCard and General Motors, Atlan has spent approximately 18 months experimenting with and refining approaches to deploying AI agents in production. The presentation provides a comprehensive view of their journey from isolated agent development to building what they call a context layer, addressing a core thesis that while model intelligence has increased exponentially, situated business context has remained static, creating a gap between AI capability and real-world usefulness.

The founder presents compelling framing around the broader industry challenge: while models have advanced dramatically from failing the bar exam two years ago to scoring in the top 1% today, only one in five AI use cases make it to production, and 56% of CEOs report zero financial benefit from AI. The core insight is that performance requires both intelligence and context, analogous to how human job performance is only 10% explained by IQ. The rest comes from on-the-job learning, organizational knowledge, domain expertise, and cultural norms.

## Phase One: Bootstrapped Individual Agents

Approximately 18 months prior to the presentation, Atlan began their agent journey by starting with their customer experience team. They conducted a jobs-to-be-done analysis to map all activities performed on a daily basis. Based on this mapping, they created hypotheses about which tasks AI could handle effectively. For instance, they determined that documentation and meeting prep were good candidates for automation, while relationship management was not suitable for near-term AI automation.

The approach involved building specialized agents for specific functions. The team got creative with naming, creating agents like Hermione as a health intelligence lead and MoneyPenny as a financial risk analyst. Each agent was optimized to be really good at one specific thing. This initial approach worked for some time and allowed the team to demonstrate value in targeted areas.

However, this bootstrapped approach revealed significant production challenges that became increasingly apparent as they scaled. The context engineering problem proved particularly acute: while building an agent infrastructure took only about five minutes, providing the necessary business context to make the agent accurate and useful took an enormous amount of time. The quality of each agent became heavily dependent on the quality of context engineering invested in it, leading to inconsistent results and lost trust from stakeholders when agents made errors based on incomplete or incorrect context.

## Critical Production Challenges

As Atlan moved these agents into production environments, they discovered that the agents operated in silos, essentially living on separate islands with no coordination mechanism. The infrastructure that exists for human organizations such as town halls, email updates, and team meetings had no equivalent for agents. A concrete example illustrated the problem: when the marketing team changed their positioning, human SDRs would learn about this through organizational communication channels. However, the marketing agents would update their content while the SDR agent on the website continued pitching the old positioning because there was no mechanism for agents to share context or coordinate changes.

The lack of observability and traceability also became problematic. When an agent produced incorrect output, it was extremely difficult to diagnose the root cause. Was the problem with the underlying model, the agent's logic, or the context provided? Without clear lineage and debugging capabilities, fixing issues became a time-consuming trial-and-error process.

Context sprawl emerged as another major issue. Each agent maintained its own memory system, learning separately and differently from other agents. This created a situation where there was no single source of truth about business knowledge. Different agents might develop contradictory understanding of the same business concepts, metrics, or processes.

The technical landscape also proved volatile. Over the course of 12 months, Atlan cycled through multiple agent frameworks and platforms. They started with Relevance, a no-code builder, then moved to Google ADK, experimented with Glean, migrated to Claude Code at the start of the year, and eventually settled on a 50/50 split between Claude and Codex. Each migration trapped context within the previous system, creating data portability challenges and requiring significant re-engineering effort.

## Phase Two: The Context Layer Architecture

Recognizing the limitations of isolated agents, Atlan pivoted to a fundamentally different architectural approach at the start of the year as general-purpose agents became more viable. Drawing inspiration from how human teams operate, they observed that high-performing teams share context through common language, shared understanding of current state, shared playbooks and procedures, shared norms around decision rights, and most importantly, compounding learning loops where the team collectively learns what good performance looks like.

The mental model they developed involved domain experts building specialized skills that feed into a centralized company brain or context layer. This context layer serves as a unified repository that can be accessed by general-purpose agents across the ecosystem through various retrieval mechanisms. The architecture prioritizes openness and interoperability rather than locking into a single agent framework.

The marketing team's implementation provides a concrete example of this architecture in practice. On one side, they connected all the systems the marketing team uses including data systems, social and community platforms, advertising platforms, and analytics platforms. They deployed multiple agent interfaces including Claude Code, Co-work, their own deployed instance of Claude that operates in Slack channels, and external products like Qualified and Artisan. In the middle sits the context layer where the best SEO person builds and maintains SEO skills, the best competitive intelligence person maintains competitive intel skills, and so on. This becomes a living repository that agents pull from and contribute back to.

Over the six-month period of this approach, Atlan created approximately 300 skills and deployed 40 agents working cohesively through this shared context layer. This represents a significant scale-up from the previous isolated agent approach and demonstrates that the architecture can support substantial complexity.

## Context Layer Components

The context layer evolved to contain several critical components necessary for production operation. A data graph maps relationships between data assets, enabling agents to understand which tables to query for specific analyses. For example, when an autonomous ads agent needs to perform daily analysis, the data graph helps it identify the appropriate data sources.

A library of skills forms the core functional capability. Skills represent reusable business capabilities that can be composed and orchestrated by agents. Each skill encapsulates domain expertise in a way that can be versioned, tested, and improved over time.

Semantics and metrics definitions provide a shared vocabulary. This includes definitions of business-critical metrics like ARR or qualified leads, ensuring agents interpret these concepts consistently. The context layer also maintains organizational structure information and entity definitions so agents understand the business topology.

## Context as Code: Management Challenges

Even with the improved architecture, Atlan discovered that context requires management disciplines similar to software code. Dependency management became complex as skills built on each other. For example, they have a competitive intelligence skill that continuously learns from market signals. This feeds into a category positioning skill, which in turn feeds a sales battle card skill. Each skill learns and evolves independently, but changes can break downstream dependencies. Skills also drift and become outdated over time without active maintenance.

Ownership and accountability proved challenging. With 300 skills and multiple contributors, determining who owns the quality of each skill and who has approval rights for changes became a governance necessity. Security and governance issues emerged quickly, with secrets hardcoded in environment files and teams downloading public skill repositories without proper security review. Context portability across the multi-agent systems remained an ongoing challenge despite the centralized architecture.

## The Vision: GitHub for Context

The presentation articulates a vision for what proper context management should look like, drawing a parallel to how GitHub revolutionized code management. Company context needs lifecycle management, collaboration capabilities, and versioning just like code. Questions about what constitutes local versus global context, how to keep context updated, and how to manage context quality all point toward treating context as a first-class managed asset.

The vision includes skills having profiles similar to code modules, with self-learning loops built in, quality management dashboards, and security posture management. Skills would have explicit metadata about what they impact, who the approver is, who maintains them, and who contributes. This would enable human-AI workspaces where skills are collaboratively developed and maintained with clear accountability.

A key insight is that every AI interaction generates more context, and harnessing this feedback represents a significant opportunity. Atlan has found value in deploying specialized harnesses that analyze traces from agent interactions, reverse-engineer learnings, and present them to maintainers for approval or rejection. This creates compounding learning loops where the system continuously improves from production usage.

For organizations wondering where to start given disparate systems, Atlan discovered that context is hidden throughout business systems and can be reverse-engineered. By connecting systems like Salesforce and HubSpot to data warehouses and application layers, then analyzing how these systems are actually connected, AI can reverse-construct the relationships and dependencies. Context currently gets lost at each integration point, but reverse engineering these connections enables bootstrapping an initial version of a company brain with high accuracy.

## Technical Architecture Details

At a high level, the context layer operates as a system that continuously mines context from business systems, feeds this into the centralized company brain, supports skills and context development lifecycles as teams deploy agents, and provides multiple retrieval mechanisms including MCP, SQL, vector retrieval, and hybrid assembly. Importantly, it pulls learnings back from traces to create compounding learning loops.

The architecture emphasizes retrieval flexibility, recognizing that different use cases may require different retrieval patterns. Vector retrieval works well for semantic similarity, SQL for structured queries, and hybrid approaches for complex reasoning tasks. Supporting multiple protocols like MCP ensures the context layer can integrate with various agent frameworks and applications.

## Production Realities and Challenges

The presentation provides a balanced view of production AI agent deployment. While the results of 300 skills and 40 agents working cohesively sound impressive, the journey involved significant challenges, failed approaches, and multiple pivots. The context engineering burden remains substantial even with improved architecture. The organization still grapples with governance, security, quality control, and keeping context current as the business evolves.

The presentation acknowledges that today, most organizations are hardcoding context into their agents. The speaker argues this approach is fundamentally unscalable and potentially dangerous. Drawing on the common joke that asking sales and finance for revenue numbers yields different answers, the speaker warns that deploying autonomous systems with inconsistent context could have serious consequences. This points to real production risks that organizations must address.

## Strategic Framing: Context as Competitive Advantage

The presentation concludes with a strategic argument that context represents intellectual property and competitive differentiation. In a world where all companies have access to the same foundation models and the same intelligence, what distinguishes one company from another is how they do business. The difference between a customer support agent at American Express versus Amazon lies in their respective company contexts, their processes, norms, and cultural approaches.

This framing positions context not just as a technical necessity for making AI work, but as the mechanism for encoding organizational culture and values into autonomous systems. As companies build what the speaker calls autonomous frontier firms, the context layer becomes the vehicle for ensuring these systems operate in alignment with company identity and values.

## Critical Assessment

The presentation provides valuable real-world insight into the challenges of deploying AI agents at scale in production environments. The progression from isolated agents to a unified context layer reflects genuine learning from production failures rather than theoretical architecture. The specific problems identified such as context sprawl, dependency management, and lack of observability are credible challenges that any organization deploying multi-agent systems would encounter.

However, several aspects warrant critical consideration. The presentation comes from a company selling solutions in this space, so the framing naturally emphasizes problems their product addresses. The metrics provided such as 300 skills and 40 agents lack context about actual business impact, accuracy improvements, or ROI. The comparison to GitHub for code is compelling but may oversimplify the challenges of managing context, which is more fluid and domain-specific than code.

The vision of skills with self-learning loops and automatic quality management remains aspirational. The technical details of how trace analysis leads to actionable improvements are limited, and production implementations would likely face challenges around feedback quality, false positives, and determining ground truth for agent outputs. The idea of reverse-engineering context from business systems is interesting but likely requires significant manual curation and validation in practice.

The presentation's emphasis on context as differentiating IP is strategically sound but also serves vendor interests. Organizations should consider whether building proprietary context layers provides sufficient competitive advantage to justify the engineering investment versus using commercial solutions or focusing on differentiation elsewhere.

Despite these caveats, the case study provides valuable lessons about the operational realities of production AI agents, the importance of treating context as a managed asset, the challenges of multi-agent coordination, and the need for governance and observability infrastructure. The evolution from bootstrapped agents to context-layer architecture reflects genuine organizational learning and offers a useful pattern for others deploying agents at scale.
