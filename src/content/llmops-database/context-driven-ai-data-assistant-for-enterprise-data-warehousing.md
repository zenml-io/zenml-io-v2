---
title: "Context-Driven AI Data Assistant for Enterprise Data Warehousing"
slug: "context-driven-ai-data-assistant-for-enterprise-data-warehousing"
draft: false
llmopsTags:
  - "data-analysis"
  - "question-answering"
  - "code-generation"
  - "rag"
  - "few-shot"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "agent-based"
  - "harness-engineering"
  - "evals"
  - "monitoring"
  - "databases"
  - "documentation"
  - "cache"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify developed an AI data assistant called Vedder to address the challenge of democratizing access to insights across 70,000+ datasets containing petabytes of data. The traditional approach of manual data expert consultation couldn't scale with thousands of fast-moving teams. Their solution implements a \"cluster model\" where domain experts curate context layers containing datasets, vetted question-SQL pairs, and business documentation. Since launching in August 2025, over 2,100 users have engaged in 13,000+ conversations across 177 domain clusters. The system achieved trustworthiness by requiring human expert curation—only 12.5% of automatically generated question-SQL pairs from query history were deemed acceptable by domain experts, highlighting the critical role of human judgment in production LLM systems."
link: "https://engineering.atspotify.com/2026/6/encoding-your-domain-expert-the-context-layer-behind-spotifys-data-assistant"
year: 2026
seo:
  title: "Spotify: Context-Driven AI Data Assistant for Enterprise Data Warehousing - ZenML LLMOps Database"
  description: "Spotify developed an AI data assistant called Vedder to address the challenge of democratizing access to insights across 70,000+ datasets containing petabytes of data. The traditional approach of manual data expert consultation couldn't scale with thousands of fast-moving teams. Their solution implements a \"cluster model\" where domain experts curate context layers containing datasets, vetted question-SQL pairs, and business documentation. Since launching in August 2025, over 2,100 users have engaged in 13,000+ conversations across 177 domain clusters. The system achieved trustworthiness by requiring human expert curation—only 12.5% of automatically generated question-SQL pairs from query history were deemed acceptable by domain experts, highlighting the critical role of human judgment in production LLM systems."
  canonical: "https://www.zenml.io/llmops-database/context-driven-ai-data-assistant-for-enterprise-data-warehousing"
  ogTitle: "Spotify: Context-Driven AI Data Assistant for Enterprise Data Warehousing - ZenML LLMOps Database"
  ogDescription: "Spotify developed an AI data assistant called Vedder to address the challenge of democratizing access to insights across 70,000+ datasets containing petabytes of data. The traditional approach of manual data expert consultation couldn't scale with thousands of fast-moving teams. Their solution implements a \"cluster model\" where domain experts curate context layers containing datasets, vetted question-SQL pairs, and business documentation. Since launching in August 2025, over 2,100 users have engaged in 13,000+ conversations across 177 domain clusters. The system achieved trustworthiness by requiring human expert curation—only 12.5% of automatically generated question-SQL pairs from query history were deemed acceptable by domain experts, highlighting the critical role of human judgment in production LLM systems."
notion:
  pageId: "37cf8dff-2538-80eb-b274-f68349162fbf"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T11:37:00.000Z"
  lastEditedTime: "2026-06-11T11:37:00.000Z"
  publishedAt: "2026-06-11T12:12:43Z"
---

## Overview

Spotify built an AI data assistant named Vedder to democratize access to data insights across their massive data warehouse containing over 70,000 datasets processing 1.4 trillion data points daily. The case study provides a detailed look at how Spotify addressed a fundamental LLMOps challenge: deploying an LLM-powered system at enterprise scale where trust, accuracy, and maintainability are paramount. The system has been in active production since August 2025, serving over 2,100 users across 13,000+ conversations with 60,000+ messages, notably including users with no SQL coding experience (representing more than 25% of the user base).

The core problem Spotify faced illustrates a common enterprise challenge: traditional approaches of either manual expert consultation or naive LLM deployment both fail at scale. Manual consultation creates bottlenecks when thousands of teams need insights simultaneously, while simply dumping all schemas into an LLM's context window proves inadequate even with million-token contexts. As Spotify discovered, schemas alone don't convey critical business context such as legacy data quirks, semantic definitions, or appropriate usage patterns—leading to confident but incorrect model outputs.

## Architecture and Technical Approach

Spotify's solution centers on what they call the "cluster model," which represents a sophisticated approach to context management in production LLM systems. A cluster represents a data domain that can be tied to an initiative, organization, or ad-hoc interest area. The architecture provides flexibility for insights teams to create clusters around their topics while preventing duplication. Each of the 177 clusters currently in production covers domains like advertising, podcasts, music, audiobooks, finances, and creator tools.

The agent follows a ReAct (Reasoning and Acting) loop pattern, which allows it to reason about questions and act in steps, adjusting behavior based on tool call returns. When users ask questions in natural language through Slack, an MCP server for IDEs, or a dedicated web UI, the agent selects appropriate context, generates SQL queries, executes them against the warehouse, and returns results alongside the query and its sources. This transparency is positioned as critical to building user trust—users can see how results were produced, not just what they were.

## The Three-Component Context Layer

Each cluster is owned by named teams of domain experts and consists of three carefully curated components that form the knowledge base for the LLM:

**Datasets** include relevant data warehouse tables with full schemas and profiling information. Spotify captures granular metadata including column cardinality, samples of common values, and partition structure. This profiling proves valuable during query generation—when the model constructs a WHERE clause, knowing that a country column contains values like 'US', 'GB', 'SE' rather than having to guess significantly improves accuracy.

**Pairs** represent vetted question-and-SQL examples that power the few-shot learning mechanism. Each pair is written or approved by domain experts who select examples teaching patterns they want the system to follow. These pairs teach both how to query the data structurally and its semantic meaning. This component becomes the core knowledge transfer mechanism from human experts to the LLM system.

**Docs** provide additional business context including terminology, gotchas, team-specific definition variations, and guidance on which columns to use or avoid. This unstructured knowledge captures the tribal knowledge that typically exists only in experts' heads or scattered documentation.

The curation responsibility resides with data scientists and analytics engineers who understand data modeling and efficient querying patterns. They decide how to partition their domains into clusters, which tables to include, and which examples matter most. This ownership model is central to Spotify's approach—recognizing that domain experts, not ML engineers, are best positioned to curate the context that LLMs operate on.

## The Critical Role of Human Judgment

One of the most valuable insights from this case study comes from Spotify's experiment with automated context generation versus human curation. The obvious scalability shortcut involved mining their complete query history to automatically generate question-SQL pairs by having an LLM infer questions from historical queries. This approach seemed promising since these were real queries written by data experts representing actual domain knowledge.

However, when Spotify tested this approach by presenting automatically generated pairs to cluster curators for review, experts accepted only **12.5%** of the proposed pairs. The remaining 87.5% represented ad-hoc exploration, debugging sessions, one-off answers, queries using wrong tables, or technically correct but pedagogically poor examples. This finding delivers a sobering assessment of automated knowledge extraction: query history is rich but mostly noise, and the signal doesn't self-identify.

This 12.5% acceptance rate stands as perhaps the most important production LLM lesson in the case study. It demonstrates that for high-stakes enterprise applications, human judgment remains irreplaceable in context curation. Spotify explicitly framed this as a trust issue—at Spotify's scale, an overconfident wrong answer could misdirect important decisions. They needed examples influencing assistant behavior to be reviewed and marked canonical by those familiar with the data.

The case study positions this not as replacing data experts but as amplifying their impact—enabling them to ship their expertise in a more scalable way. This represents a mature perspective on LLM deployment that acknowledges both the technology's capabilities and limitations.

## Operational Excellence: Monitoring and Maintenance

Spotify recognizes that static context becomes stale as data changes, business logic shifts, and schemas evolve. Columns get renamed, tables get deprecated and replaced, and context accurate last month may be wrong today. Their solution implements a sophisticated health monitoring system that operates continuously without requiring constant manual attention.

Each cluster has a health score computed from multiple signals that Spotify calculates and monitors. These signals include the health of underlying data used in the cluster, validity of curated pairs after recent schema changes (pairs referencing renamed columns degrade immediately), coverage of context relative to questions users actually ask, reproducibility of generated SQL, and additional metrics. When any signal degrades, the cluster's health score reflects this and suggests remediation actions.

Data experts view health scores and underlying signals on cluster dashboards, using them to prioritize curation efforts. This monitoring approach represents sophisticated LLMOps practice—moving beyond initial deployment to sustainable long-term operation. The system doesn't just alert to problems; it provides actionable intelligence about where human attention should focus.

## Feedback Loops and Continuous Improvement

Every conversation with Vedder becomes a data point feeding back into the system. Spotify logs all conversations and queries, making questions, answers, generated SQL, and user feedback visible to cluster owners. This closed-loop design enables continuous improvement based on actual usage patterns.

The case study frames this as scaling data scientist knowledge—every approved question-SQL pair and clarified documentation helps subsequent users get more accurate insights. This positions the LLM system not as a static tool but as a learning system that improves through sustained expert investment. However, the case study doesn't provide specific metrics on improvement rates or quantitative measures of accuracy gains over time, which represents a gap in demonstrating the value of this feedback investment.

## Multi-Interface Deployment Strategy

Spotify deployed Vedder through three interfaces targeting different usage patterns: a Slack bot for quick questions during thread conversations, an MCP (Model Context Protocol) server for integration with IDEs and AI tools, and a dedicated web UI for interactive exploration. This multi-surface strategy recognizes that data needs arise in different work contexts and meeting users where they already work increases adoption.

When no knowledge base covers a topic, the agent explicitly informs users of this limitation. This transparency about capability boundaries represents mature production LLM deployment—avoiding the common pitfall of systems that hallucinate answers outside their knowledge domain.

## Generalizability and Limitations

Spotify acknowledges their strong data foundation—well-maintained datasets, a data catalog, and engaged data scientists—made Vedder possible. They claim the architecture isn't Spotify-specific and the core idea of having domain experts curate model context remains valid across organizations. However, this assertion deserves scrutiny. Organizations without Spotify's data maturity, dedicated data science teams, or cultural commitment to data quality may struggle to implement similar systems.

The case study represents an organization with significant resources investing in both technical infrastructure and ongoing human curation. The 177 clusters covering diverse domains suggest substantial organizational investment in expert time. Smaller organizations or those with less mature data practices might find the curation burden prohibitive. The case study doesn't discuss costs, resource requirements, or what minimum organizational capabilities enable this approach.

## Future Directions

Spotify indicates they're exploring expanding beyond schema-based knowledge to incorporate documentation and process definitions existing throughout the organization. This suggests evolution toward a more comprehensive knowledge layer that bridges structured data with unstructured organizational knowledge. The brief mention leaves many questions unanswered about technical approaches, integration challenges, or expected timelines.

## Critical Assessment

The case study provides unusual transparency about a production LLM system's architecture and operational reality. The 12.5% acceptance rate for automatically generated examples stands out as a refreshingly honest admission of automated approach limitations. Many vendor case studies would obscure such findings.

However, several claims warrant skepticism or request additional evidence. The case study doesn't provide accuracy metrics, error rates, or comparison with baseline approaches. User adoption numbers (2,100 users, 13,000 conversations) are presented without context about total potential user base, adoption rates over time, or user satisfaction measures. The claim that "more than a quarter" of users haven't coded SQL before is interesting but doesn't demonstrate these users successfully get reliable answers without SQL knowledge.

The health scoring system sounds sophisticated but lacks detail about threshold settings, false positive rates, or how often degraded scores actually predict user-facing problems. The feedback loop mechanism is described conceptually but without metrics showing whether it actually improves system performance over time.

The case study takes a product marketing tone in places, particularly when discussing how the system "makes answers trustworthy" and enables experts to work "more strategically." These claims would benefit from user research data, time savings measurements, or comparative studies of decision quality.

## LLMOps Maturity

Despite these reservations, the case study demonstrates several hallmarks of mature LLMOps practice:

- **Human-in-the-loop design** that recognizes LLM limitations and positions experts as essential rather than replaceable
- **Comprehensive monitoring** with health scores tracking multiple signals of system degradation
- **Transparent operation** where users can inspect reasoning and sources rather than receiving black-box answers
- **Feedback integration** that captures production usage to inform system improvement
- **Multi-interface deployment** meeting users in their existing workflows
- **Explicit capability boundaries** where the system acknowledges knowledge gaps rather than hallucinating

The cluster ownership model represents a particularly interesting governance approach, distributing responsibility for context quality to domain experts rather than centralizing it with ML teams. This organizational design choice may prove as important as technical architecture decisions for long-term system sustainability.

The ReAct framework implementation shows sophisticated agent design beyond simple prompt-completion patterns. The combination of reasoning steps, tool use, and iterative refinement represents state-of-practice agentic system design.

## Conclusion

Spotify's Vedder data assistant represents a substantial production LLM deployment addressing real enterprise challenges with thoughtful architecture and operational design. The emphasis on human curation, continuous monitoring, and transparent operation demonstrates mature understanding of LLM capabilities and limitations in high-stakes environments. The 12.5% acceptance rate finding alone makes this case study valuable for practitioners considering automated context generation approaches.

However, the case study would benefit from more quantitative evidence of effectiveness, clearer discussion of costs and resource requirements, and honest assessment of challenges encountered during development and operation. Organizations considering similar approaches should carefully assess whether they possess the data maturity, expert availability, and organizational commitment that Spotify's implementation appears to require.
